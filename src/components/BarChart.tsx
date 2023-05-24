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

const queryClient = new QueryClient();

const fetchChartData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  const data = await response.json();
  return data;
};

const Chart = () => {
  const { data, isLoading, error } = useQuery("chartData", fetchChartData);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const dataArray = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

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
            <BarChart width={1500} height={400} data={dataArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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
