import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSoundVolumeStore } from '../store/soundVolumeStore';
import { soundList, SoundKey } from '../constants/sound';
import debounce from 'lodash.debounce';

const STORAGE_KEY = 'sound_volumes';

// 타입 선언이 없을 경우를 위한 모듈 선언
// @ts-ignore
// eslint-disable-next-line
// declare module 'lodash.debounce';

export const useSoundVolumes = () => {
  const { volumes, setVolume, setRandomVolumes } = useSoundVolumeStore();

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

  // 디바운스된 저장 함수 생성
  const debouncedSave = useRef(
    debounce((vols: typeof volumes) => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vols));
    }, 1000) // 1초
  ).current;

  // 볼륨이 바뀔 때마다 디바운스 저장 함수 호출
  useEffect(() => {
    debouncedSave(volumes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumes]);

  return { volumes, setVolume, setRandomVolumes };
}; 