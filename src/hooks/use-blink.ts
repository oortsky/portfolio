import { useEffect, useState } from "react";

export function useBlink() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const createBlinkPattern = () => {
      setIsBlinking(true);

      setTimeout(() => {
        setIsBlinking(false);
      }, 150);
    };

    const interval = setInterval(
      createBlinkPattern,
      Math.random() * 5000 + 3000
    );

    return () => clearInterval(interval);
  }, []);

  return isBlinking;
}
