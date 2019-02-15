import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "consts";
import { shape, arrayOf } from "prop-types";
import { mapStyles } from "./styled";

const GoogleMap = ({ google, center, points }) => (
  <Map
    google={google}
    style={{ width: "100%", height: "100%" }}
    styles={mapStyles}
    initialCenter={center}
    center={center}
    mapTypeControl={false}
    fullscreenControl={false}
    scaleControl={false}
    zoomControl={false}
    streetViewControl={false}
    panControl={false}
    rotateControl={false}
    zoom={16}
  >
    {points.map(p => (
      <Marker {...p} icon="/static/mapMarker.svg" />
    ))}
  </Map>
);

GoogleMap.propTypes = {
  google: shape().isRequired,
  center: shape().isRequired,
  points: arrayOf(shape())
};

GoogleMap.defaultProps = {
  points: []
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(GoogleMap);
