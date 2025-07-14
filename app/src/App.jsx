import "./App.css";

import { useState } from "react";
import { DeckGL } from "deck.gl";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
} from "@deck.gl-community/editable-layers";
import { Map } from "react-map-gl";

//import { log } from '@deck.gl/core';
//log.level = 4;

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

function App() {
  const [features, setFeatures] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [selectedFeatureIndexes] = useState([]);

  const layer = new EditableGeoJsonLayer({
    data: features,
    mode: DrawPolygonMode,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }) => {
      setFeatures(updatedData);
    },
  });

  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={{
          doubleClickZoom: false,
        }}
        layers={[layer]}
        getCursor={layer.getCursor.bind(layer)}
      >
        <Map
          mapboxAccessToken="pk.eyJ1IjoiYWtpeWFta2EiLCJhIjoiY2p3aG4zY2Y2MDFyNjQ2bjZ1bTNldjQyOCJ9.uM8bC4cSVnYETymmoonsEg"
          initialViewState={INITIAL_VIEW_STATE}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </DeckGL>
    </div>
  );
}

export default App;
