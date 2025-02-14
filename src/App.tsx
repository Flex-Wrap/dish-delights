import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar
import Footer from "./Components/Footer"; // Import the Footer
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import DetailsPage from "./Pages/DetailsPage";
import FavoritesPage from "./Pages/FavoritesPage";
import CreateRecipePage from "./Pages/CreateRecipePage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar stays fixed across all pages */}
      <div className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/create" element={<CreateRecipePage />} />
        </Routes>
      </div>
      <Footer /> {/* Footer stays at the bottom of all pages */}
    </div>
  );
}

export default App;
