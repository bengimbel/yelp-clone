import {
    searchUrl,
    CITY_QUERY_INFO_REQUEST,
    CITY_QUERY_INFO_SUCCESS,
    CITY_QUERY_INFO_FAIL
} from '../utils/constants';


 export default function getCityQueryInfo(info) {
    return dispatch => {
        dispatch({ type: CITY_QUERY_INFO_REQUEST })
        const proxyurl = "https://cors-anywhere.herokuapp.com/";   
        console.log(info, 'info');
        const newUrl = `${searchUrl}q=${info.cuisineInput}&lat=${info.cityLat}&lon=${info.cityLng}`;
        console.log(newUrl);
        const finalUrl = proxyurl + newUrl;
        return fetch(finalUrl).then(response => response.json())
        .then(cityQueryData => {
            dispatch({ type: CITY_QUERY_INFO_SUCCESS, payload: cityQueryData })
        })
        .catch(error => {
            dispatch({ type: CITY_QUERY_INFO_FAIL, payload: error })
        })
    }
}