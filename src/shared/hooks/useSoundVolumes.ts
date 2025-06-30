import { useSoundVolumeStore } from '../store/soundVolumeStore';
import { SoundKey } from '../constants/sound';

export const useSoundVolumes = () => {
  const { volumes, setVolume, setRandomVolumes } = useSoundVolumeStore();
  return { volumes, setVolume, setRandomVolumes };
}; 