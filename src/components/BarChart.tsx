import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import MobileScreenDetector from "./MobileScreenDetector";
import axios from "axios";

const queryClient = new QueryClient();

const fetchChartData = async () => {
  // Send a GET request to retrieve COVID-19 data for all countries
  const response = await axios.get("https://disease.sh/v3/covid-19/all");
  // Return the response data
  return response.data;
};

const Chart = () => {
  const { data, isLoading, error } = useQuery("chartData", fetchChartData);
  let isMobile = true;
  isMobile = MobileScreenDetector();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const dataArray = Object.entries(data)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((d) => d.name !== "updated");

  return (
    <div>
      <div className="flex justify-center">
        <Link to="/linegraph" className="text-red-500 hover:text-red-700">
          Go to Line Graph
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 ">
          <div style={{ width: "100%" }}>
            <BarChart
              width={isMobile ? 375 : 1500}
              height={800}
              data={dataArray}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis fontSize={12} dataKey="name" />
              <YAxis fontSize={8} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

function BarCharts() {
  return (
    <QueryClientProvider client={queryClient}>
      <Chart />
    </QueryClientProvider>
  );
}

export default BarCharts;
