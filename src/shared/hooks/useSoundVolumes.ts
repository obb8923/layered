import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSoundVolumeStore } from '../store/soundVolumeStore';
import { soundList, SoundKey } from '../constants/sound';

const STORAGE_KEY = 'sound_volumes';

export const useSoundVolumes = () => {
  const { volumes, setVolume } = useSoundVolumeStore();

  // AsyncStorage에서 볼륨 불러와 zustand store 초기화
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: { [key in SoundKey]?: number } = JSON.parse(stored);
          Object.entries(parsed).forEach(([key, volume]) => {
            setVolume(key as SoundKey, volume as number);
          });
        } else {
          // 저장된 값이 없으면 defaultVolume으로 초기화
          soundList.forEach(sound => {
            setVolume(sound.key, sound.defaultVolume);
          });
        }
      } catch (e) {
        // 에러 시 defaultVolume으로 초기화
        soundList.forEach(sound => {
          setVolume(sound.key, sound.defaultVolume);
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 볼륨이 바뀔 때마다 AsyncStorage에 저장
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(volumes));
  }, [volumes]);

  return { volumes, setVolume };
}; 