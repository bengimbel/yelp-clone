import React, { Component } from "react";
import { connect } from 'react-redux';
import fetchPopularFoodByCity from '../actions/FetchFoodData'; 
import Searchbar from './Searchbar';
import getCityQueryInfo from '../actions/FetchCityData';
import Script from 'react-load-script';


class Application extends Component {
    constructor(props) {
        super(props)
        
    }

    componentWillMount() {

    }
    
    renderList() {
        console.log(this.props.cityQueryData, 'this.props.cityQueryData');
        const { cityQueryData } = this.props;
        if(cityQueryData.data && cityQueryData.isFetching != null) {
            const { restaurants } = this.props.cityQueryData.data;
            return (
                restaurants.map((restaurant) => {
                    return (
                        <li key={restaurant.restaurant.id}>{restaurant.restaurant.name}</li>
                    )
                })
            )
        } else {
            return (
                <li>LOADING</li>
            )
            
        }
    }


    render() {
        return (
            <div>
                <Searchbar />
                <Script 
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1LMFoHC67o360Y5aLGGAtGyXdsAiNQ6s&libraries=places"          
                    onLoad={this.initAutocomplete}        
                /> 
                <ul>
                {
                    this.renderList()
                }
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        foodData: state.foodData,
        cityQueryData: state.cityQueryData
    };
};
export default connect(mapStateToProps, { fetchPopularFoodByCity, getCityQueryInfo })(Application);
