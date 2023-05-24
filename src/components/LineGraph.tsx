import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  LineChart,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import MobileScreenDetector from "./MobileScreenDetector";

const queryClient = new QueryClient();

const fetchData = async () => {
  // Send a GET request to retrieve historical COVID-19 data
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );

  // Return the response data
  return response.data;
};
function App() {
  const { data, isLoading, error } = useQuery("casesData", fetchData);
  let isMobile = true;
  isMobile = MobileScreenDetector();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error?.toString() || "Something went wrong"}</div>;
  }

  const arr = [];
  for (const date in data.cases) {
    arr.push({
      date: date,
      cases: data.cases[date],
      deaths: data.deaths[date],
      recovered: data.recovered[date],
    });
  }

  return (
    <div>
      <div className="flex justify-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Go to Home Page
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="md:w-10/12">
          <LineChart width={isMobile ? 360 : 1690} height={400} data={arr}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize={isMobile ? 10 : 16} dataKey="date" />
            <YAxis fontSize={11} textAnchor="end" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" />
            <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
            <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
