import React, { Component } from 'react';
import getCityQueryInfo from '../actions/FetchCityData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchPopularFoodByCity from '../actions/FetchFoodData'; 
import Script from 'react-load-script';

class Searchbar extends Component {
    constructor(props){
        super(props)
        this.state = ({
            cityInput: '',
            cityData: [],
            cityLat: '',
            cityLng: '',
            cuisineInput: '',
            cuisineData: [],
            city: ''
        });
        this.initAutocomplete = this.initAutocomplete.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.onCityInputChange = this.onCityInputChange.bind(this);
        this.onFormCitySubmit = this.onFormCitySubmit.bind(this);
        this.onCuisineInputChange = this.onCuisineInputChange.bind(this);
    }

    initAutocomplete() {
        // Declare Options For Autocomplete
        var options = {
          types: ['(cities)'],
        };
    
        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          options,
        );
    
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
      }

      onCityInputChange(e) {
        this.setState({cityInput: e.target.value})
        console.log(this.state.cityInput)
      }

      onCuisineInputChange(e) {
        this.setState({cuisineInput: e.target.value})
        console.log(this.state.cuisineInput)
      }

      handlePlaceSelect() {

        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;

        console.log(addressObject, 'address object');
        console.log(addressObject.geometry.location.lat(), 'LAT');
        console.log(addressObject.geometry.location.lng(),'LNG');
        let lat = addressObject.geometry.location.lat();
        let lng = addressObject.geometry.location.lng();
        console.log(lat, 'LAT');
        console.log(lng,'LNG');
        console.log(address, 'address');
        // Check if address is valid
        if (address) {
          // Set State
          console.log('finshed');
          this.setState({
              city: address[0].long_name,
              cityInput: addressObject.formatted_address,
              cityLat: lat,
              cityLng: lng
            });
          console.log(this.state, 'this.state');
        }
      }


      onFormCitySubmit(e) {
        e.preventDefault()
    
        this.props.getCityQueryInfo(this.state)
            // this.setState({
            //     cityData: this.props.cityData.data.location_suggestions
            // })
        
        //    const entityId = this.state.data[0].entity_id
        //    const entityType = this.state.data[0].entity_type
        //    this.props.fetchPopularFoodByCity(entityId, entityType);

        this.setState({
            cityInput: '',
            cuisineInput: ''
        });
    
      }

      render(){
        return(
            <div>
            <Script 
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1LMFoHC67o360Y5aLGGAtGyXdsAiNQ6s&libraries=places"          
                onLoad={this.initAutocomplete}        
            /> 
          <form onSubmit={this.onFormCitySubmit} className='input-group'>
            <input
            id="autocomplete"
            placeholder='search here'
            className='form-control'
            value={this.state.cityInput}
            onChange={this.onCityInputChange}
            />
            <input
            placeholder='search here'
            className='form-control'
            value={this.state.cuisineInput}
            onChange={this.onCuisineInputChange}
            />

            <span className='input-group-btn'>
              <button type='submit' className='btn btn-secondary'>Submit</button>
            </span>
          </form>
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCityQueryInfo, fetchPopularFoodByCity }, dispatch);
  }
const mapStateToProps = (state) => {
    return {
        foodData: state.foodData,
        cityData: state.cityData
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)