import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import Loading from "./Loading";

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
    return <Loading />;
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
      <div className="m-auto">
        <div style={{ width: "100%", height: "800px" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

            {countriesData.map((country) => (
              <Marker
                key={country.countryInfo._id}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={L.icon({
                  iconUrl: country.countryInfo.flag ?? (
                    <i className="fas fa-info-circle"></i>
                  ),
                  iconSize: [20, 20],
                  iconAnchor: [16, 32],
                })}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Active Cases: {country.active}</p>
                    <p>Recovered Cases: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <h1 className="pt-10 text-xl md:text-2xl lg:text-3xl text-center mx-4 md:mx-8 lg:mx-16 xl:mx-20">
        In this example, a map is created using the React Leaflet library. The
        markers on the map represent countries, and each marker is represented
        by the map of the country itself. When a marker is clicked, a popover
        appears, displaying the details related to COVID-19 formalities in that
        country.
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
