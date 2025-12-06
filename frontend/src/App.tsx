import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Landing from "./pages/Landing";
// import Landing from "./components/new/Landing"
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSplashComplete = () => {
    // Show content immediately so card can transition to hero
    setShowContent(true);
    // Hide splash after a short delay
    setTimeout(() => {
      setShowSplash(false);
    }, 100);
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {showContent && (
        <>
          <Header show={showContent} />
          <Landing showHeroCard={showContent} />
          <Footer />
        </>
      )}

      {/* <Landing /> */}
    </div>
  );
}

export default App;