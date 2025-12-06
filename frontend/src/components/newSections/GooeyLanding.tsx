// import { useRef, useEffect, useState } from 'react';
// import { GooeyOverlay } from './GooeyOverlay';
// import { ScrollMessage } from './ScrollMessage';
// import { TextOverlay } from './TextOverlay';
// import { TracingBeam } from '../ui/TracingBeam';

// export const GooeyLanding: React.FC = () => {
//   const pageRef = useRef<HTMLDivElement>(null);
//   const [contentHeight, setContentHeight] = useState(0);

//   useEffect(() => {
//     const updateHeight = () => {
//       if (pageRef.current) {
//         setContentHeight(pageRef.current.scrollHeight);
//       }
//     };

//     updateHeight();
//     window.addEventListener('resize', updateHeight);

//     return () => window.removeEventListener('resize', updateHeight);
//   }, []);

//   return (
//     <div className="relative w-full" style={{ backgroundColor: '#fff0e5' }}>
//       {/* WebGL Gooey Overlay */}
//       <GooeyOverlay />

//       {/* Tracing Beam Progress Bar */}
//       <TracingBeam />

//       {/* Scroll Message */}
//       <ScrollMessage />

//       {/* Text Overlay Footer */}
//       <TextOverlay />

//       {/* Main Content Page */}
//       <div ref={pageRef} className="gooey-page w-full min-h-[1500px] flex flex-col items-center pt-0">
//         {/* Hero Section */}
//         <section className="w-full h-screen flex flex-col items-center justify-center px-4 sm:px-8">
//           <div className="max-w-2xl text-center space-y-8">
//             <h1 className="text-6xl md:text-7xl font-light tracking-tight">
//               Welcome to Gooey
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 font-light">
//               Experience smooth, fluid animations as you scroll through this page
//             </p>
//             <button className="mt-8 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-light">
//               Explore
//             </button>
//           </div>
//         </section>

//         {/* Content Sections */}
//         <section className="w-full px-4 sm:px-8 py-32">
//           <div className="max-w-3xl mx-auto space-y-16">
//             {/* Section 1 */}
//             <div className="space-y-6">
//               <h2 className="text-4xl md:text-5xl font-light">Features</h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 This landing page showcases a beautiful gooey morphing effect powered by WebGL shaders. 
//                 Watch as the visual elements flow and transform as you scroll down the page.
//               </p>
//             </div>

//             {/* Section 2 */}
//             <div className="space-y-6 pt-12">
//               <h2 className="text-4xl md:text-5xl font-light">How It Works</h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 The effect uses Simplex noise and advanced GLSL fragment shaders to create organic, 
//                 fluid animations. The progress is synchronized with your scroll position for a seamless experience.
//               </p>
//             </div>

//             {/* Section 3 */}
//             <div className="space-y-6 pt-12">
//               <h2 className="text-4xl md:text-5xl font-light">Technology</h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 Built with React, TypeScript, and Tailwind CSS for a modern development experience. 
//                 The animations are powered by GSAP and WebGL for smooth 60fps performance.
//               </p>
//             </div>

//             {/* Section 4 */}
//             <div className="space-y-6 pt-12">
//               <h2 className="text-4xl md:text-5xl font-light">Performance</h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 Optimized for all devices with responsive design and hardware-accelerated rendering. 
//                 The WebGL shader runs efficiently even on lower-end devices.
//               </p>
//             </div>

//             {/* Section 5 */}
//             <div className="space-y-6 pt-12">
//               <h2 className="text-4xl md:text-5xl font-light">Customization</h2>
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 Easily customize colors, animation speed, and effect intensity. 
//                 The component is fully configurable through parameters and props.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Footer Section */}
//         <section className="w-full h-screen flex flex-col items-center justify-center px-4 sm:px-8">
//           <div className="text-center space-y-8">
//             <h2 className="text-5xl md:text-6xl font-light">Thanks for scrolling</h2>
//             <p className="text-xl text-gray-600">
//               Continue exploring or visit our social links above
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
