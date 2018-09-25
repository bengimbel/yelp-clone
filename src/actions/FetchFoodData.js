import { 
    newUrl,
    FETCH_POPULAR_FOOD_BY_CITY, 
    FETCH_POPULAR_FOOD_BY_CITY_SUCCESS,
    FETCH_POPULAR_FOOD_BY_CITY_FAIL
 } from '../utils/constants';

 export default function fetchPopularFoodByCity(id, type) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";    
    const url = `${newUrl}entity_id=${id}&entity_type=${type}`;
    const finalUrl = proxyurl + url;
     return dispatch => {
         dispatch({ type: FETCH_POPULAR_FOOD_BY_CITY })

         return fetch(finalUrl).then(response => response.json())
            .then(foodData => {
                dispatch({ type: FETCH_POPULAR_FOOD_BY_CITY_SUCCESS, payload: foodData})
            })
            .catch(error => {
                dispatch({ type: FETCH_POPULAR_FOOD_BY_CITY_FAIL, payload: error})
             })
    }
 }

