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

const queryClient = new QueryClient();

const fetchData = async () => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};
function App() {
  const { data, isLoading, error } = useQuery("casesData", fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
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
    <div className="flex justify-center">
      <LineChart width={600} height={400} data={arr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis fontSize={11} textAnchor="end" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
      </LineChart>
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
