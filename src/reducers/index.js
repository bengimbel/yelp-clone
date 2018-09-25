import PopularFoodByCity from './PopularFoodByCity';
import CityInfoReducer from './CityInfoReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    foodData: PopularFoodByCity,
    cityQueryData: CityInfoReducer
});