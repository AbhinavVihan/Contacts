import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import NotFoundPage from "./components/NotFoundPage";
import LineChart from "./components/LineGraph";

const Map = lazy(() => import("./components/Map.jsx"));
const LineGraph = lazy(() => import("./components/LineGraph"));

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-3/4 sm:w-5/6 p-4 bg-white">
          <Routes>
            <Route path="/" element={<ContactList />} />
            {/* <Route path="/" element={<LineChart />} /> */}

            <Route path="/" element={<Outlet />}>
              <Route path="add" element={<ContactForm />} />
              <Route path="contact/:id" element={<ContactForm />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/map" element={MapLazy()} />
            <Route path="/linegraph" element={LineGraphLazy()} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/map";

  if (hideSidebar) {
    return null; // Return null to hide the sidebar when on /map route
  }

  return (
    <nav className="bg-gray-200 w-1/4 sm:w-1/6">
      <ul className="p-4">
        <li>
          <Link className="block py-2 px-4 rounded hover:bg-gray-300" to="/">
            Contact
          </Link>
        </li>
        <li>
          <Link className="block py-2 px-4 rounded hover:bg-gray-300" to="/map">
            Charts and Map
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const MapLazy = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Map />
  </Suspense>
);

const LineGraphLazy = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LineGraph />
  </Suspense>
);

export default App;
