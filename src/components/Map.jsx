import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";

const queryClient = new QueryClient();

const fetchCountriesData = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

const Map = () => {
  const {
    data: countriesData,
    isLoading,
    isError,
  } = useQuery("countriesData", fetchCountriesData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching country data</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Back
        </Link>
        <Link to="/linegraph" className="text-red-500 hover:text-red-700">
          Go to Line Graph
        </Link>
      </div>
      <div className="m-auto ml-10">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

          {countriesData.map((country, index) => (
            <Marker
              key={country.countryInfo.iso2 + index}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={L.icon({
                iconUrl: require("../logo192.png"),
                iconSize: [20, 20],
                iconAnchor: [16, 32],
              })}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered Cases: {country.recovered}</p>
                  <p>Deaths</p>
                  <i className="fas fa-info-circle"></i>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <h1 className="flex justify-center font-bold text-2xl">
        Map created by react-leaflet to show no. of Cases and Deaths and no. of
        patients recovered as the popup.
      </h1>
    </div>
  );
};

function LeafMap() {
  return (
    <QueryClientProvider client={queryClient}>
      <Map />
    </QueryClientProvider>
  );
}

export default LeafMap;
