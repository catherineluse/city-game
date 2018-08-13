import { combineReducers } from 'redux';
import citiesWithPopulation from './reducer_cities_with_population';
import citiesWithCoordinates from './reducer_cities_with_coordinates';
import citiesInQueue from './reducer_cities_in_queue';
import positionInCityQueue from './reducer_position_in_queue';
import activeState from './reducer_active_state';
import states from './states';

const rootReducer = combineReducers({
  citiesWithPopulation,
  citiesWithCoordinates,
  citiesInQueue,
  positionInCityQueue,
  activeState,
  states
});

export default rootReducer;
