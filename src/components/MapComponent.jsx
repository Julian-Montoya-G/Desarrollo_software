import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";


function MapComponent({
  location,
  path = []
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


  const polylinePositions =
    path.map(
      (point) => [
        point.latitude,
        point.longitude
      ]
    );


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


        {polylinePositions.length > 1 && (

          <Polyline
            positions={polylinePositions}
          />

        )}


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
