type SoundCache = {
  [key: string]: HTMLAudioElement;
};

class SoundManager {
  private sounds: SoundCache = {};
  private isMuted: boolean = false;

  /**
   * Preload sound file
   * @param name - Unique identifier for the sound
   * @param url - Path to audio file (e.g., '/sounds/pop.mp3')
   */
  preload(name: string, url: string): void {
    if (typeof window === "undefined") return; // Skip on server-side

    if (!this.sounds[name]) {
      const audio = new Audio(url);
      audio.preload = "auto";
      this.sounds[name] = audio;
    }
  }

  /**
   * Play a sound
   * @param name - Name of preloaded sound or direct URL
   * @param options - Playback options
   */
  play(
    name: string,
    options?: {
      volume?: number; // 0.0 to 1.0
      loop?: boolean;
      rate?: number; // playback speed
    }
  ): void {
    if (typeof window === "undefined" || this.isMuted) return;

    try {
      let audio = this.sounds[name];

      // If not preloaded, create new Audio instance
      if (!audio) {
        audio = new Audio(name);
        this.sounds[name] = audio;
      }

      // Clone audio for overlapping sounds
      const sound = audio.cloneNode() as HTMLAudioElement;

      // Apply options
      if (options?.volume !== undefined) {
        sound.volume = Math.max(0, Math.min(1, options.volume));
      }
      if (options?.loop !== undefined) {
        sound.loop = options.loop;
      }
      if (options?.rate !== undefined) {
        sound.playbackRate = options.rate;
      }

      sound.play().catch(error => {
        console.warn("Sound play failed:", error);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  /**
   * Stop all instances of a sound
   */
  stop(name: string): void {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
    }
  }

  /**
   * Mute all sounds
   */
  mute(): void {
    this.isMuted = true;
  }

  /**
   * Unmute all sounds
   */
  unmute(): void {
    this.isMuted = false;
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Check if muted
   */
  getMuteState(): boolean {
    return this.isMuted;
  }

  /**
   * Clear all cached sounds
   */
  clear(): void {
    this.sounds = {};
  }
}

// Export singleton instance
export const sound = new SoundManager();

// Export helper functions for common use cases
export const playSound = (
  name: string,
  options?: Parameters<typeof sound.play>[1]
) => {
  sound.play(name, options);
};

export const preloadSound = (name: string, url: string) => {
  sound.preload(name, url);
};

export const muteSound = () => sound.mute();
export const unmuteSound = () => sound.unmute();
export const toggleMuteSound = () => sound.toggleMute();
