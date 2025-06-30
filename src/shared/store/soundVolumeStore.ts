import { create } from 'zustand';
import type { SoundKey } from '../constants/sound';
import { soundList } from '../constants/sound';
import AudioModule from '../modules/AudioModule';

interface SoundVolumeState {
  volumes: { [soundKey in SoundKey]?: number };
  isPaused: boolean;
  setVolume: (soundKey: SoundKey, volume: number) => void;
  setRandomVolumes: () => void;
  pause: () => void;
  resume: () => void;
}

export const useSoundVolumeStore = create<SoundVolumeState>((set, get) => ({
  volumes: {},
  isPaused: false,
  setVolume: (soundKey, volume) =>
    set((state) => ({
      volumes: {
        ...state.volumes,
        [soundKey]: volume,
      },
    })),
  setRandomVolumes: () => {
    // 3~4개의 사운드를 랜덤으로 선택
    const numSounds = Math.random() < 0.5 ? 3 : 4;
    const shuffledSounds = [...soundList].sort(() => Math.random() - 0.5);
    const selectedSounds = shuffledSounds.slice(0, numSounds);
    
    set((state) => {
      const newVolumes = { ...state.volumes };
      
      // 선택되지 않은 사운드는 볼륨을 0으로 설정
      soundList.forEach(sound => {
        if (!selectedSounds.find(selected => selected.key === sound.key)) {
          newVolumes[sound.key] = 0;
        }
      });
      
      // 선택된 사운드만 랜덤 볼륨 설정
      selectedSounds.forEach(sound => {
        const randomVolume = Math.round(Math.random() * 100) / 100;
        newVolumes[sound.key] = randomVolume;
      });
      
      return { volumes: newVolumes };
    });
  },
  pause: () => {
    set({ isPaused: true });
    AudioModule.pause();
  },
  resume: () => {
    set({ isPaused: false });
    AudioModule.resume();
  },
})); 