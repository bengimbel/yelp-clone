import { 
    CITY_QUERY_INFO_REQUEST, 
    CITY_QUERY_INFO_SUCCESS,
    CITY_QUERY_INFO_FAIL
 } from '../utils/constants';

 const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
 }

 export default function(state = initialState, action) {
    switch (action.type) {
        case CITY_QUERY_INFO_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            data: null,
            hasError: false,
            errorMessage: null
        });
        case CITY_QUERY_INFO_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.payload,
            hasError: false,
            errorMessage: null
        });
        case CITY_QUERY_INFO_FAIL:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.payload,
            hasError: true,
            errorMessage: action.error
        });
        default:
          return state;
      }
    
    }