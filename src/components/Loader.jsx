import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const Loader = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1100);
    }
  }, [progress, total, loaded, item]);

  //  Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex flex-col items-center justify-center bg-zinc-950
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-xl md:text-7xl font-silkscreen text-white relative mb-8">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            opacity: `${progress}%`,

            transform: `scale(${0.9 + (progress / 100) * 0.2})`,
          }}
        >
          {`loading${dots}`}
        </div>
        <div className="opacity-0">{`loading...`}</div>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-96 h-2 md:h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        className="text-white text-lg md:text-3xl text-center font-silkscreen mt-5"
        style={{
          opacity: progress > 2 ? 1 : 0,
          textShadow: "0 0 10px rgba(255,255,255,0.5)",
        }}
      >
        {Math.floor(progress)}
        {"%"}
      </p>

      <p className="text-zinc-400 text-xs md:text-sm mt-4 opacity-75">
        {item && `Loading: ${item}`}
      </p>
    </div>
  );
};
