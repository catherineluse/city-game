export default function(state = 0, action){
  switch(action.type){
    case 'POSITION_RESET':
      return 0;
    case 'POSITION_INCREMENTED':
      return action.payload;
    default:
      return state;
  }
}
