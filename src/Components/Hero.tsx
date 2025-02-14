import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface HeroProps {
  image: string; // Image URL as a prop
}

const Hero: React.FC<HeroProps> = ({ image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-[500px] md:h-[600px] w-screen bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${image})` }} // Dynamic image
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold">Discover Delicious Recipes</h1>
        <p className="text-lg md:text-xl mt-3">
          Explore amazing dishes and share your own creations with the world!
        </p>
      </div>

      {/* Call-to-Action Button - Navigates to Create Page */}
      <div className="absolute bottom-6 right-6">
        <Button 
          text="Get Started" 
          color="#ff5733" 
          className="text-lg px-8 py-3" 
          onClick={() => navigate("/create")}
        />
      </div>
    </div>
  );
};

export default Hero;
