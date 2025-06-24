import { useCallback, useState } from "react";
import AudioModule from "../../../shared/modules/AudioModule";

/**
 * useSoundPlayer 훅
 *
 * 특정 음원(key, fileName)에 대해 재생/정지/볼륨 상태를 관리하고,
 * 슬라이더 값 변화에 따라 자동으로 재생/정지/볼륨조절을 처리합니다.
 *
 * @param key        음원 구분용 고유 키 (예: 'rain1', 'wind')
 * @param fileName   실제 재생할 파일명 (확장자 없이, 예: 'rain1')
 * @param initialVolume  초기 볼륨 값 (0.0 ~ 1.0)
 * @returns { volume, playing, handleSlider }
 *   - volume: 현재 볼륨 상태
 *   - playing: 현재 재생중 여부
 *   - handleSlider: 슬라이더 onChange에 연결할 함수 (값에 따라 자동 재생/정지/볼륨조절)
 *
 * 동작 원리:
 *   - 슬라이더 값이 0이면: 재생중이면 정지, 아니면 아무 동작 없음
 *   - 슬라이더 값이 0 초과이고 재생중이 아니면: 재생 + 볼륨 설정
 *   - 슬라이더 값이 0 초과이고 재생중이면: 볼륨만 조절
 */
export const useSoundPlayer = (key: string, fileName: string, initialVolume: number) => {
    const [volume, setVolume] = useState(initialVolume);
    const [playing, setPlaying] = useState(false);
  
    const handleSlider = useCallback(async (value: number) => {
      setVolume(value);
      if (value === 0) {
        if (playing) {
          await AudioModule.stop(key);
          setPlaying(false);
        }
      } else {
        if (!playing) {
          await AudioModule.play(key, fileName);
          await AudioModule.setVolume(key, value);
          setPlaying(true);
        } else {
          await AudioModule.setVolume(key, value);
        }
      }
    }, [playing, key, fileName]);
  
    return { volume, playing, handleSlider };
  }