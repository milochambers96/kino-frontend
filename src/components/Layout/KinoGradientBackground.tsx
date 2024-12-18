import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const KinoGradientBackground = ({ children }: BackgroundProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        backgroundImage: `radial-gradient(
          circle,
          #d43726a4 30%,
          #95303ca1 65%,
          #6b234f5a 80%,
          #361228 90%,
          #34141c 100%
        )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
};

export default KinoGradientBackground;
