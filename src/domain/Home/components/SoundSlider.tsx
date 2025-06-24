import { useSoundPlayer } from "../Hooks/useSoundPlayer";
import Slider from "../../../shared/components/Slider";
import { View, Text as RNText } from "react-native";
import { useEffect } from "react";

// 개별 음원 슬라이더 컴포넌트
export const SoundSlider = ({ label, soundKey, fileName, initialVolume }: {
    label: string;
    soundKey: string;
    fileName: string;
    initialVolume: number;
  }) => {  
    const { volume, handleSlider } = useSoundPlayer(soundKey, fileName, initialVolume);

    useEffect(() => {
      // 초기 볼륨이 0 초과면 자동 재생
      if (initialVolume > 0) {
        handleSlider(initialVolume);
      }
    }, []);

    return (
      <View style={{ marginBottom: 32 }}>
        <RNText>{label}</RNText>
        <Slider
          min={0}
          max={1}
          step={0.01}
          width={200}
          height={20}
          value={volume}
          onChange={handleSlider}
        />
      </View>
    );
  }