import React, { Component } from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import { GOOGLE_API_KEY } from "../../utils/constants";

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      value: ""
    };
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction); // eslint-disable-line
    this.setState({ search: "", value: geocodedPrediction.formatted_address });
  };

  render() {
    const { search, value } = this.state;
    return (
      <div className="autocomplete">
        <GoogleMapLoader
          params={{
            key: GOOGLE_API_KEY,
            libraries: "places,geocode"
          }}
          render={googleMaps =>
            googleMaps && (
              <GooglePlacesSuggest
                className="form-control"
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: search
                }}
                // Optional props
                onSelectSuggest={this.handleSelectSuggest}
                textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                customRender={prediction => (
                  <div className="customWrapper">
                    {prediction
                      ? prediction.description
                      : "My custom no results text"}
                  </div>
                )}
              >
                <input
                  type="text"
                  value={value}
                  placeholder="Search a location"
                  onChange={this.handleInputChange}
                />
              </GooglePlacesSuggest>
            )
          }
        />
      </div>
    );
  }
}

export default AutoComplete;
