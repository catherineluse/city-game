export default function(state = [], action){
  switch(action.type){
    case 'FETCHED_CITIES_WITH_POPULATION':
      return action.payload;
    default:
      return state;
  }
}
