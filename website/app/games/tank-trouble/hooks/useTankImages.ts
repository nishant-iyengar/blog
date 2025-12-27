import { useEffect, useState } from 'react';

export function useTankImages() {
  const [tankImages, setTankImages] = useState<{ blue: HTMLImageElement | null; red: HTMLImageElement | null }>({
    blue: null,
    red: null,
  });

  useEffect(() => {
    const blueImg = new Image();
    blueImg.src = '/games/tank-blue.svg';
    blueImg.onload = () => {
      setTankImages((prev) => ({ ...prev, blue: blueImg }));
    };

    const redImg = new Image();
    redImg.src = '/games/tank-red.svg';
    redImg.onload = () => {
      setTankImages((prev) => ({ ...prev, red: redImg }));
    };
  }, []);

  return tankImages;
}

