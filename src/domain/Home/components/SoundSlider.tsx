import { useSoundPlayer } from "../Hooks/useSoundPlayer";
import Slider from "../../../shared/components/Slider";
import { View } from "react-native";
import { useEffect, useState } from "react";
import {Text} from '../../../shared/components/Text'

// 개별 음원 슬라이더 컴포넌트
export const SoundSlider = ({ label, soundKey, fileName, initialVolume }: {
    label: string;
    soundKey: string;
    fileName: string;
    initialVolume: number;
  }) => {  
    const { volume, handleSlider } = useSoundPlayer(soundKey, fileName, initialVolume);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      // 초기 볼륨이 0 초과면 자동 재생
      if (initialVolume > 0) {
        handleSlider(initialVolume);
      }
    }, []);

    return (
      <View 
      className="w-full mb-8"
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Text text={label}/>
        <Slider
          min={0}
          max={1}
          step={0.01}
          width={containerWidth > 0 ? containerWidth : 200}
          height={30}
          value={volume}
          onChange={handleSlider}
        />
      </View>
    );
  }