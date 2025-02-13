import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import DetailsPage from "./Pages/DetailsPage";
import FavoritesPage from "./Pages/FavoritesPage";
import CreateRecipePage from "./Pages/CreateRecipePage";

function App() {
  return (
    <div className="pt-16"> {/* Add padding to prevent content from hiding under navbar */}
      <Navbar /> {/* Navbar stays fixed across all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/create" element={<CreateRecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
