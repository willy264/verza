// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import AboutSlime from "../../images/about_slime.svg";

// gsap.registerPlugin(ScrollTrigger);

// const TransitioningSlime = () => {
//   const slimeRef = useRef<HTMLDivElement>(null);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const slime = slimeRef.current;
//     if (!slime) return;

//     const setupAnimation = () => {
//       const heroI = document.getElementById('hero-i-placeholder');
//       const aboutSection = document.getElementById('about');
//       const aboutPlaceholder = document.getElementById('about-slime-placeholder');

//       if (!heroI || !aboutSection || !aboutPlaceholder) {
//         console.log('⏳ Waiting for elements...', {
//           heroI: !!heroI,
//           aboutSection: !!aboutSection,
//           aboutPlaceholder: !!aboutPlaceholder
//         });
//         setTimeout(setupAnimation, 300);
//         return;
//       }

//       console.log('✅ All elements found!');

//       // Get initial measurements
//       const heroRect = heroI.getBoundingClientRect();
//       const aboutRect = aboutPlaceholder.getBoundingClientRect();
//       const aboutSectionRect = aboutSection.getBoundingClientRect();
      
//       // Calculate viewport-relative positions
//       const heroX = heroRect.left + heroRect.width / 2;
//       const heroY = heroRect.top + heroRect.height / 2;
      
//       const aboutX = aboutRect.left + aboutRect.width / 2;
//       const aboutY = aboutRect.top + aboutRect.height / 2;
      
//       // Calculate when About section enters viewport
//       const aboutSectionTop = aboutSection.offsetTop;
//       const scrollDistanceToAbout = aboutSectionTop - window.innerHeight / 2;

//       console.log('📍 Positions:', {
//         hero: { x: heroX, y: heroY },
//         about: { x: aboutX, y: aboutY },
//         aboutSectionTop,
//         scrollDistanceToAbout
//       });

//       // Set initial position
//       gsap.set(slime, {
//         position: 'fixed',
//         left: heroX,
//         top: heroY,
//         xPercent: -50,
//         yPercent: -50,
//         scale: 0.1,
//         opacity: 1,
//         rotation: 0,
//         zIndex: 50,
//       });

//       setIsReady(true);

//       // Animation timeline
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: aboutSection,
//           start: 'top bottom', // When top of about section hits bottom of viewport
//           end: 'top 20%', // When top of about section hits 20% from top of viewport
//           scrub: 2,
//           markers: false, // Set true to debug
//           onUpdate: (self) => {
//             console.log('📊 Progress:', Math.round(self.progress * 100) + '%');
//           }
//         }
//       });

//       // Animate to About position
//       timeline.to(slime, {
//         left: aboutX,
//         top: aboutY,
//         scale: 0.4,
//         rotation: 12,
//         ease: 'power2.inOut',
//       });

//       // Keep slime fixed to viewport in About section area
//       ScrollTrigger.create({
//         trigger: aboutSection,
//         start: 'top 20%',
//         end: 'bottom 80%',
//         markers: false,
//         onUpdate: () => {
//           // Continuously update position to keep slime in same viewport position
//           const currentAboutRect = aboutPlaceholder.getBoundingClientRect();
//           const currentX = currentAboutRect.left + currentAboutRect.width / 2;
//           const currentY = currentAboutRect.top + currentAboutRect.height / 2;
          
//           gsap.set(slime, {
//             left: currentX,
//             top: currentY,
//             position: 'fixed',
//           });
//         }
//       });

//       // Floating animation
//       gsap.to(slime, {
//         y: '+=15',
//         duration: 3,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut',
//       });

//       // Handle window resize
//       const handleResize = () => {
//         const newHeroRect = heroI.getBoundingClientRect();
//         const newAboutRect = aboutPlaceholder.getBoundingClientRect();
        
//         ScrollTrigger.refresh();
//       };

//       window.addEventListener('resize', handleResize);

//       return () => {
//         window.removeEventListener('resize', handleResize);
//       };
//     };

//     const timer = setTimeout(setupAnimation, 1200);

//     return () => {
//       clearTimeout(timer);
//       ScrollTrigger.getAll().forEach(st => st.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={slimeRef}
//       className="pointer-events-none"
//       style={{
//         opacity: isReady ? 1 : 0,
//         transition: 'opacity 0.5s',
//         width: '300px',
//         height: '300px',
//       }}
//     >
//       {/* Glow effect */}
//       <div
//         className="absolute inset-0 rounded-full blur-[80px]"
//         style={{
//           background: "radial-gradient(circle, rgba(34, 197, 94, 0.7) 0%, rgba(0, 212, 146, 0.4) 50%, transparent 100%)",
//           transform: 'scale(2)',
//           opacity: 0.6,
//         }}
//       />
      
//       {/* Slime image */}
//       <img
//         src={AboutSlime}
//         alt="Verza"
//         className="w-full h-full object-contain relative z-10"
//         style={{
//           filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
//         }}
//       />
//     </div>
//   );
// };

// export default TransitioningSlime;