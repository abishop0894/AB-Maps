import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "../App.js";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJpc2hvcDA4NCIsImEiOiJjbDB4N2luZzEwNTYzM2JvM3ZkcXNiejBkIn0.E9Votyz3GiXy6ZPqHGvZYg";

export const Maps = (props) => {
  const mapContainer = useRef();
  const ctx = useContext(Context);
  const [latitude, setLatitude] = React.useState(-119.9995942198457);
  const [longitude, setLongitude] = React.useState(38.619551620333496);
  console.log(ctx.results[0].longitude + ", " + ctx.results[0].latitude);

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [latitude, longitude],
      zoom: 14,
      pitch: 60,
    });

    //navcontrol
    <span className="navCntrl">
      {map.addControl(new mapboxgl.NavigationControl())}
    </span>;

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });

      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      map.once("load");

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            5,
            0.3,
            8,
            1,
          ],
          // set up the sky layer for atmospheric scattering
          "sky-type": "atmosphere",
          // explicitly set the position of the sun rather than allowing the sun to be attached to the main light source

          // set the intensity of the sun as a light source (0-100 with higher values corresponding to brighter skies)
          "sky-atmosphere-sun-intensity": 5,
        },
      });

      //REMOVE FOR WEATHER APP
      map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#fff",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 1.0,
          },
        },
        labelLayerId
      );
    });
    map.once("load");

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
  }, [longitude, latitude, ctx]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default Maps;

// onClick search handler
// (e) => {
//const Search = e.target.value;
//await flyto=> {e.target.value.longitute} {e.target.value.latitude}
//then perspective => animate this to adjust frame by frame
//title={e.target.value.name}
//id={e.target.value.id}
//}
