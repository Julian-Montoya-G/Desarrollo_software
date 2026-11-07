import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


function MapComponent({
  location
}) {

  if (!location) {

    return (

      <div className="map-empty">

        <p>
          Obtén tu ubicación para mostrar el mapa.
        </p>

      </div>

    );

  }


  const position = [
    location.latitude,
    location.longitude
  ];


  return (

    <div className="map-container">

      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "400px"
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <Marker
          position={position}
        >

          <Popup>

            <strong>
              Tu ubicación
            </strong>

            <br />

            Latitud:
            {" "}
            {location.latitude.toFixed(6)}

            <br />

            Longitud:
            {" "}
            {location.longitude.toFixed(6)}

          </Popup>

        </Marker>

      </MapContainer>

    </div>

  );

}


export default MapComponent;