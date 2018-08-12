

//shuffle code comes from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function rollNewSubRegion(){
  //roll new state within area of united states.

  gameState.positionInRegionQueue = Math.floor(Math.random() * statecodes.length);
  var subRegion = statecodes[gameState.positionInRegionQueue]["State"];
  setSubRegion(subRegion);
}

function goToNextSubRegion(){
  gameState.positionInRegionQueue = statecodes.length % (gameState.positionInRegionQueue + 1);
  var subRegion = statecodes[gameState.positionInRegionQueue]["State"];
  setSubRegion(subRegion);
}

function getIncorrectCities(cities_in_region, correctCityName){

  let cityQueue = cities_in_region;
  let correctCityIdx = cityQueue.indexOf(gameState.correctCityData);

  let cityQueueMinusCorrectCity = cityQueue.slice(0, correctCityIdx).concat(cityQueue.slice(correctCityIdx + 1));
  let offset = Math.floor(Math.random() * cityQueueMinusCorrectCity.length);
  let incorrectCities = [];

    for (let i = 0; i < 3; i++){
        let incorrectCity = cityQueueMinusCorrectCity[(i + offset) % cityQueueMinusCorrectCity.length];
        let incorrectCityName = incorrectCity["NAME"];
        incorrectCities.push(incorrectCityName);
    }
  return incorrectCities;
}

function checkIfCorrect(guess){
    if (parseInt(guess) === gameState.correctCityIdx + 1){
      document.getElementById("errorMessage").classList.remove("show");

      setProgressBar();

      if (gameState.cityQueue !== null && gameState.positionInCityQueue === gameState.cityQueue.length){
        goToNextSubRegion();
      } else {
        setUpGameBoard();
      }
    } else {
      document.getElementById("errorMessage").classList.add("show");
      document.getElementById("errorMessage").innerHTML = "You clicked " + gameState.choices[guess - 1] + ". Try again.";
    }
}

function setProgressBar(){
  var percentComplete = Math.floor((gameState.positionInCityQueue / (gameState.cityQueue.length - 1)) * 100);
  document.getElementById("regionProgressBar").setAttribute("style", "width: " + percentComplete + "%");
  document.getElementById("regionProgressBar").setAttribute("aria-valuenow", percentComplete);
}

function resetProgressBar(){
  gameState.positionInCityQueue = -1;
  document.getElementById("regionProgressBar").setAttribute("style", "width: " + 1 + "%");
  document.getElementById("regionProgressBar").setAttribute("aria-valuenow", 1);
}

function setSubRegion(state){
  gameState.subRegionName = state;
  resetProgressBar();
  setUpGameBoard();
}

var gameState = {
  "country": null,
  "sub_country_region":null,
  "cityQueue":null,
  "subRegionName": "Arizona",
  "citiesInQueue": null,
  "positionInCityQueue":-1,
  "positionInSubCountryRegionQueue":0,
  "correctCityData": null,
  "correctCityName": null,
  "correctCityPopulation": null,
  "correctCityLatitude": null,
  "correctCityLongitude": null,
  "correctCityIdx": null,
  "choices":null,
  "learnedRegions":[],
  "question": null,
  "choicesString": null,
  "populationMessage": null,
  "choiceCoordinates": null,
  "meanLatAndLong": null
};

function getMeanCoordinates(coordinates){
  let combinedLats = 0;
  let combinedLongs = 0;

  for (let i = 0; i < 4; i++){
    combinedLats += coordinates[i]["lat"];
    combinedLongs += coordinates[i]["lng"]
  }
  var meanLat = combinedLats/4;
  var meanLong = combinedLongs/4;
  return [meanLat, meanLong];
}

function dedupe(array){
  var uniques = [];
  var usedNames = [];
  for (let i = 0; i < array.length; i++){
    let ele = array[i];
    if (usedNames.indexOf(ele["NAME"]) === -1){
      uniques.push(ele);
      usedNames.push(ele["NAME"]);
    }
  }
  return uniques;
}

function removeBadCoords(array){
  return array.filter(function(ele){return ele["INTPTLAT"] && ele["INTPTLONG"]})
}

function getChoiceCoordinates(choices){
  var setsOfCoordinates = [];

  for (var i = 0; i < choices.length; i++){
    let cityName = choices[i];
    let cityData = gameState.cityQueue.filter((ele)=> ele["NAME"] === cityName);

    let latitude = Number(cityData[0]["INTPTLAT"]);
    let longitude = Number(cityData[0]["INTPTLONG"]);

    let set = {
      lat: latitude,
      lng: longitude
    }
    setsOfCoordinates.push(set);
  }
  return setsOfCoordinates;
}

function generateQueue(state){
  let stateData = statecodes.filter(function(ele){return state === ele["State"]})[0];

  let code = stateData.Abbreviation;
  let queue = citylist.filter(function(ele){return code === ele["USPS"] && ele["PLACE_TYPE"] !== "CDP"});

  if (queue.length < 4){
    queue = citylist.filter(function(ele){return code === ele["USPS"]});
  }

  return queue;
}

function setUpGameBoard(){

      var currentRegion = document.getElementById("regionStatement");
      currentRegion.innerHTML = gameState.subRegionName;
      gameState.positionInCityQueue++;

      document.getElementById("regionProgressSentence").innerHTML = "You found " + gameState.positionInCityQueue + " cities in " + gameState.subRegionName + ".";
      // document.getElementById("worldProgressSentence").innerHTML = "You learned " + gameState.learnedRegions.length + " regions.";
      /*document.getElementById("worldProgressSentence").innerHTML = "You found " + gameState.learnedRegions.length + " out of " + allSubRegions.length + " regions.";*/


      if (gameState.correctCityData === undefined){
        document.getElementById("errorMessage").innerHTML = "";
        goToNextSubRegion();
        setUpGameBoard();
/*
        if (gameState.learnedRegions.indexOf(currentRegion[0]) === undefined){
          gameState.learnedRegions = gameState.learnedRegions.concat(currentRegion[0]);
        }
        */
        document.getElementById("errorMessage").classList.add("show");
        return;
      }

      //build a question


      gameState.cityQueue = generateQueue(gameState.subRegionName);

      gameState.cityQueue = shuffle(gameState.cityQueue);
      gameState.correctCityData = gameState.cityQueue[gameState.positionInCityQueue];
      gameState.correctCityName = gameState.correctCityData['NAME'];
      gameState.correctCityLatitude = gameState.correctCityData['INTPTLAT'];
      gameState.correctCityLongitude = gameState.correctCityData['INTPTLONG'];

      gameState.choices = shuffle(getIncorrectCities(gameState.cityQueue, gameState.correctCityName).concat(gameState.correctCityName));
      gameState.correctCityIdx = gameState.choices.indexOf(gameState.correctCityName);
      gameState.question = "Can you find " + gameState.correctCityName + "?";
      document.getElementById("question").innerHTML = gameState.question;

      gameState.choicesString = "choices are " + JSON.stringify(gameState.choices);
      gameState.choiceCoordinates = getChoiceCoordinates(gameState.choices);
      gameState.meanLatAndLong = getMeanCoordinates(gameState.choiceCoordinates);


      function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: gameState.meanLatAndLong[0], lng: gameState.meanLatAndLong[1]},
          mapTypeId: 'terrain'
        });

        var dodgerBlueMarker = {
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: 'dodgerblue',
          fillOpacity: 0.8,
          scale: 1.25,
          strokeColor: 'dodgerblue',
          strokeWeight: 1
        };

        var royalBlueMarker = {
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: 'royalblue',
          fillOpacity: 0.8,
          scale: 1.25,
          strokeColor: 'royalblue',
          strokeWeight: 1
        };

        var mediumPurpleMarker = {
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: 'mediumpurple',
          fillOpacity: 0.8,
          scale: 1.25,
          strokeColor: 'mediumpurple',
          strokeWeight: 1
        };

        var mediumVioletRedMarker = {
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: 'mediumvioletred',
          fillOpacity: 0.8,
          scale: 1.25,
          strokeColor: 'mediumvioletred',
          strokeWeight: 1
        };

        var marker1 = new google.maps.Marker({
          position: gameState.choiceCoordinates[0],
          map: map,
          icon: dodgerBlueMarker
        });
        var marker2 = new google.maps.Marker({
          position: gameState.choiceCoordinates[1],
          map: map,
          icon: royalBlueMarker
        });
        var marker3 = new google.maps.Marker({
          position: gameState.choiceCoordinates[2],
          map: map,
          icon: mediumPurpleMarker
        });
        var marker4 = new google.maps.Marker({
          position: gameState.choiceCoordinates[3],
          map: map,
          icon: mediumVioletRedMarker
        });
      }

      initMap();
}


window.onload = function() {
  var buttonsArray = ["pick1", "pick2", "pick3", "pick4"];

  for (var m = 0; m < buttonsArray.length; m++){
    document.getElementById(buttonsArray[m]).addEventListener("click", function(val){
      val.preventDefault();
      checkIfCorrect(this.id[4]);
    });
  }

  document.getElementById("rollrandom").addEventListener("click", function(val){
    val.preventDefault();
    rollNewSubRegion();
  });

  document.getElementById("nextregion").addEventListener("click", function(val){
    val.preventDefault();
    goToNextSubRegion();
  });

  document.getElementById("replayregion").addEventListener("click", function(val){
    val.preventDefault();
    resetProgressBar();
    setUpGameBoard();
  });

  document.onkeydown = checkKey;

  function checkKey(e) {

      e = e || window.event;

      if (e.keyCode == '38') {
          // up arrow = guess 1
          checkIfCorrect(1);
      }
      else if (e.keyCode == '40') {
          // down arrow = guess 4
          checkIfCorrect(4);
      }
      else if (e.keyCode == '37') {
         // left arrow = guess 2
         checkIfCorrect(2);
      }
      else if (e.keyCode == '39') {
         // right arrow = guess 3
         checkIfCorrect(3);
      }

  }


  var buttonNames = statecodes.map(function(ele){return ele["State"]});

  for (var n = 0; n < buttonNames.length; n++){
    var buttonName = buttonNames[n];
    document.getElementById(buttonName).addEventListener("click", function(val){
      val.preventDefault();
      setSubRegion(this.id);
    });
  }

  rollNewSubRegion();
  setUpGameBoard();
};
