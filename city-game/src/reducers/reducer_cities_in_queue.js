export default function(state = [], action){
  switch(action.type){
    case 'CITY_QUEUE_WAS_SET':
      return action.payload;
    default:
      return state;
  }
}
