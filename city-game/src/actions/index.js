import axios from 'axios';
//STATE_SELECTED payload should be an object.
//It corresponds with state.activeState.
export function setActiveState(state){
  return {
    type: 'STATE_SELECTED',
    payload: state
  }
}

//CITY_QUEUE_WAS_SET payload should be an array.
//It corresponds with state.citiesInQueue.
export function setCitiesInQueue(cities){
  return {
    type: 'CITY_QUEUE_WAS_SET',
    payload: cities
  }
}

export function filterCitiesByState(cities, state){
  let filteredCities = null;
  //filter logic goes here
  return {
    type: 'CITY_QUEUE_WAS_SET',
    payload: filteredCities
  }
}

export function filterCitiesByPopulation(citiesWithPopulation, pop){
  let filteredCities = null;
  //filter logic goes here
  return {
    type: 'CITY_QUEUE_WAS_SET',
    payload: filteredCities
  }
}

//FETCHED_CITIES_WITH_COORDINATES payload
//should be an array. It corresponds with
//state.citiesWithCoordinates.
export function fetchCitiesWithCoordinates(state){
  const request = axios.get('localhost:8000/coordinates');
  return {
    type: 'FETCHED_CITIES_WITH_COORDINATES',
    payload: request
  }
}

//FETCHED_CITIES_WITH_POPULATION payload
//should be an array. It corresponds with
//state.citiesWithPopulation.
export function fetchCitiesWithPopulation(state){
  const request = axios.get('localhost:8000/population');
  return {
    type: 'FETCHED_CITIES_WITH_POPULATION',
    payload: request
  }
}

//Corresponds with state.positionInQueue
export function resetCityQueuePosition(){
  return {
    type: 'POSITION_RESET',
    payload: null
  }
}

//Corresponds with state.positionInQueue
export function incrementPositionInCityQueue(position){
  let newPosition = (position + 1) % 50;
  return {
    type: 'POSITION_INCREMENTED',
    payload: newPosition
  }
}
