import { useState, useEffect } from "react";

export const AnimatedLoadingText = () => {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStep((s) => (s + 1) % 2);
        setFade(true);
      }, 150);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <span
      style={{
        opacity: fade ? 1 : 0,
        transition: "opacity 0.15s ease-in-out",
        display: "inline-block",
        minWidth: "160px",
        textAlign: "center",
      }}
    >
      {step === 0 ? "Generating schema..." : "Generating fake data..."}
    </span>
  );
};
