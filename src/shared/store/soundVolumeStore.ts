import { create } from 'zustand';
import type { SoundKey } from '../constants/sound';

interface SoundVolumeState {
  volumes: { [soundKey in SoundKey]?: number };
  setVolume: (soundKey: SoundKey, volume: number) => void;
}

export const useSoundVolumeStore = create<SoundVolumeState>((set) => ({
  volumes: {},
  setVolume: (soundKey, volume) =>
    set((state) => ({
      volumes: {
        ...state.volumes,
        [soundKey]: volume,
      },
    })),
})); 