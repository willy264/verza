import Hero from "../components/Hero";
import About from "../components/About";
import Solutions from "../components/Solutions";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
// import TransitioningSlime from "../components/TransitioningSlime";

interface LandingProps {
  showHeroCard?: boolean;
}

const Landing = ({ showHeroCard = true }: LandingProps) => {
  return (
    <main className="relative w-full">

      {/* <TransitioningSlime /> */}
      
      {/* Your sections */}
      <Hero showCard={showHeroCard} />
      <About />
      <Solutions />
      <HowItWorks />
      <FAQ />
    </main>
  );
};

export default Landing;