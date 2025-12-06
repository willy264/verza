// import React, { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Import all components
// import GooeyCanvasOverlay from './GooeyCanvasOverlay';
// import TracingBeam from './TracingBeam';
// import HeroSection from './HeroSection';
// import AboutSection from './AboutSection';
// import HowItWorksSection from './HowItWorksSection';
// import FeaturesSection from './FeaturesSection';
// import SecuritySection from './SecuritySection';
// import IntegrationsSection from './IntegrationSection';
// import CTASection from './CTASection';
// import Footer from './Footer';

// gsap.registerPlugin(ScrollTrigger);

// const App: React.FC = () => {
//   useEffect(() => {
//     // Smooth scroll
//     const lenis = {
//       scrollTo: (target: number, options?: any) => {
//         window.scrollTo({
//           top: target,
//           behavior: 'smooth',
//         });
//       },
//     };

//     // Initialize scroll animations
//     ScrollTrigger.refresh();

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="relative w-full bg-white overflow-x-hidden">
//       {/* Gooey WebGL Canvas Overlay */}
//       <GooeyCanvasOverlay />

//       {/* Tracing Beam Progress Indicator */}
//       <TracingBeam />

//       {/* All Sections */}
//       <main className="relative z-10">
//         <HeroSection />
//         <AboutSection />
//         <HowItWorksSection />
//         <FeaturesSection />
//         <SecuritySection />
//         <IntegrationsSection />
//         <CTASection />
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default App;