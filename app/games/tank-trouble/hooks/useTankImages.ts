import { useEffect, useRef } from 'react';

export function useTankImages() {
  const tankImagesRef = useRef<{ blue: HTMLImageElement | null; red: HTMLImageElement | null }>({
    blue: null,
    red: null,
  });

  useEffect(() => {
    const blueImg = new Image();
    blueImg.src = '/games/tank-blue.svg';
    blueImg.onload = () => {
      tankImagesRef.current.blue = blueImg;
    };

    const redImg = new Image();
    redImg.src = '/games/tank-red.svg';
    redImg.onload = () => {
      tankImagesRef.current.red = redImg;
    };
  }, []);

  return tankImagesRef;
}

