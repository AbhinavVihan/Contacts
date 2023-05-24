import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import NotFoundPage from "./components/NotFoundPage";
import Loading from "./components/Loading";
import BarCharts from "./components/BarChart";

const Map = lazy(() => import("./components/Map.jsx"));
const LineGraph = lazy(() => import("./components/LineGraph"));

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  let shouldShowFullMapAndGraph = false;

  if (
    location.pathname === "/map" ||
    location.pathname === "/linegraph" ||
    location.pathname === "/barGraph"
  ) {
    shouldShowFullMapAndGraph = true;
  }

  return (
    <div className="flex min-h-screen">
      {!shouldShowFullMapAndGraph && <Sidebar />}

      <div className={`${!shouldShowFullMapAndGraph && "w-3/4"} p-4 bg-white`}>
        <Routes>
          <Route path="/" element={<ContactList />} />

          <Route path="/" element={<Outlet />}>
            <Route path="add" element={<ContactForm />} />
            <Route path="contact/:id" element={<ContactForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          {shouldShowFullMapAndGraph && (
            <>
              <Route path="/map" element={<MapLazy />} />
              <Route path="/linegraph" element={<LineGraphLazy />} />
              <Route path="/barGraph" element={<BarGraphLazy />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <nav className="bg-gray-200 w-1/4 sm:w-1/6">
      <ul className="p-4">
        <li>
          <Link
            className="block py-1 px-4 rounded hover:bg-gray-300 bg-blue-100"
            to="/"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="block mt-5 py-1 px-4 rounded hover:bg-gray-300 bg-blue-100"
            to="/map"
          >
            Charts and Map
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const MapLazy = () => (
  <Suspense fallback={<Loading />}>
    <Map />
  </Suspense>
);

const LineGraphLazy = () => (
  <Suspense fallback={<Loading />}>
    <LineGraph />
  </Suspense>
);

const BarGraphLazy = () => (
  <Suspense fallback={<Loading />}>
    <BarCharts />
  </Suspense>
);

export default App;
