import { 
    FETCH_POPULAR_FOOD_BY_CITY, 
    FETCH_POPULAR_FOOD_BY_CITY_SUCCESS,
    FETCH_POPULAR_FOOD_BY_CITY_FAIL
 } from '../utils/constants';

 const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
 }

 export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_POPULAR_FOOD_BY_CITY:
        return Object.assign({}, state, {
          isFetching: true,
          data: null,
          hasError: false,
          errorMessage: null
        });
        case FETCH_POPULAR_FOOD_BY_CITY_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          data: action.payload,
          hasError: false,
          errorMessage: null
        });
        case FETCH_POPULAR_FOOD_BY_CITY_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
          data: action.payload,
          hasError: true,
          errorMessage: action.err
        });
        default:
          return state;
      }
    
    }
 