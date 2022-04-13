import "../App.css";
import ReactMapboxAutocomplete from "react-mapbox-autocomplete";
import * as React from "react";
import { useContext } from "react";
import { Context } from "../App.js";
//todo
//create context array containing an object in app.js or map js.
//onSubmit push lat, lng to context to be accesed in search fn from there
//for weather component, push result value

const SearchEngine = () => {
  const [searchState, setSearchState] = React.useState(false);
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  //autofill search results
  const ctx = useContext(Context);

  let suggestionSelect = (result, lat, lng, text) => {
    console.log(result, lat, lng, text);
    setLatitude(lat);
    setLongitude(lng);
  };

  let testFn = (event) => {
    ctx.results.pop();
    ctx.results.push({
      longitude: parseFloat(longitude).toFixed(4),
      latitude: parseFloat(latitude).toFixed(4),
    });

    console.log(ctx.results[0]);

    console.log("success");
    setSearchState(true);
  };

  return (
    <div className="search">
      <span className="input-group-text" id="basic-addon1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>

      <form onSubmit={testFn}>
        <ReactMapboxAutocomplete
          publicKey="pk.eyJ1IjoiYWJpc2hvcDA4NCIsImEiOiJjbDB4N2luZzEwNTYzM2JvM3ZkcXNiejBkIn0.E9Votyz3GiXy6ZPqHGvZYg"
          inputClass="form-control"
          onSuggestionSelect={suggestionSelect}
          resetSearch={searchState}
        />
      </form>
    </div>
  );
};

export default SearchEngine;
