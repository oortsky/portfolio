"use client";

import { useEffect, useCallback, useState } from "react";
import { sound } from "@/lib/sound";

interface UseSoundOptions {
  volume?: number;
  preload?: boolean;
}

/**
 * React hook for managing sounds
 * @param soundName - Name identifier for the sound
 * @param soundUrl - URL/path to the sound file
 * @param options - Configuration options
 */
export function useSound(
  soundName: string,
  soundUrl: string,
  options: UseSoundOptions = {}
) {
  const { volume = 1, preload = true } = options;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (preload) {
      sound.preload(soundName, soundUrl);
      setIsLoaded(true);
    }
  }, [soundName, soundUrl, preload]);

  const play = useCallback(
    (overrideOptions?: { volume?: number; loop?: boolean; rate?: number }) => {
      sound.play(soundName, {
        volume,
        ...overrideOptions
      });
    },
    [soundName, volume]
  );

  const stop = useCallback(() => {
    sound.stop(soundName);
  }, [soundName]);

  return { play, stop, isLoaded };
}

/**
 * Hook for managing multiple sounds
 */
export function useSounds(
  sounds: Record<string, string>,
  options: UseSoundOptions = {}
) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (options.preload !== false) {
      Object.entries(sounds).forEach(([name, url]) => {
        sound.preload(name, url);
      });
      setIsLoaded(true);
    }
  }, [sounds, options.preload]);

  const play = useCallback(
    (
      soundName: string,
      overrideOptions?: { volume?: number; loop?: boolean; rate?: number }
    ) => {
      sound.play(soundName, {
        volume: options.volume,
        ...overrideOptions
      });
    },
    [options.volume]
  );

  return { play, isLoaded };
}
