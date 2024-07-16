// App.jsx
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import Account from "./pages/Account";
import Places from "./pages/Places";
import PlacesForm from "./pages/PlacesForm";
import Placespage from "./pages/PlacePage";
import ShowingAllpics from "./pages/ShowingAllpics";
import BookingPage from "./pages/BookingPage"
axios.defaults.baseURL = "http://localhost:4000"; // Ensure correct baseURL
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<Placespage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/photos/:id" element={<ShowingAllpics />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
