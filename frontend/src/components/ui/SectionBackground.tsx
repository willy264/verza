import GridBackground from "../../images/Grid background.svg";

interface SectionBackgroundProps {
  variant?: "top" | "bottom" | "both";
  gradientOpacity?: number;
}

export default function SectionBackground({
  variant = "bottom",
  gradientOpacity = 0.3,
}: SectionBackgroundProps) {
  return (
    <>
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={GridBackground}
          alt="grid"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Gradient Effect */}
      {(variant === "top" || variant === "both") && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(22, 163, 74, 0.2) 50%, transparent 100%)",
            opacity: gradientOpacity,
          }}
        />
      )}

      {(variant === "bottom" || variant === "both") && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(22, 163, 74, 0.2) 50%, transparent 100%)",
            opacity: gradientOpacity,
          }}
        />
      )}
    </>
  );
}
