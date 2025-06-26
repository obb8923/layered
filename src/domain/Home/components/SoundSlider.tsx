import { useSoundPlayer } from "../Hooks/useSoundPlayer";
import Slider from "../../../shared/components/Slider";
import { View } from "react-native";
import { useEffect, useState } from "react";
import {Text} from '../../../shared/components/Text'
import River from '../../../../assets/svgs/River.svg'
import Frog from '../../../../assets/svgs/Frog.svg'
import Rain1 from '../../../../assets/svgs/Rain1.svg'
import Rain2 from '../../../../assets/svgs/Rain2.svg'
import Bonfire from '../../../../assets/svgs/Bonfire.svg'
import Bird1 from '../../../../assets/svgs/Bird1.svg'
import Cricket1 from '../../../../assets/svgs/Cricket1.svg'
import Wind1 from '../../../../assets/svgs/Wind1.svg'
import React from 'react';
import {Colors} from '../../../shared/constants/Colors'
import { useSoundVolumes } from '../../../shared/hooks/useSoundVolumes';
import type { SoundKey } from '../../../shared/constants/sound';
const iconMapStyle = {width:24,height:24,color:Colors.line}
const iconMap: Record<string, React.ReactNode> = {
  rain1: <Rain1 {...iconMapStyle} />, 
  rain2: <Rain2 {...iconMapStyle} />, 
  frog1: <Frog {...iconMapStyle} />, 
  river1: <River {...iconMapStyle} />, 
  fire1: <Bonfire {...iconMapStyle} />, 
  bird1: <Bird1 {...iconMapStyle} />,
  crickets1: <Cricket1 {...iconMapStyle} />,
  wind1: <Wind1 {...iconMapStyle} />
};

// 개별 음원 슬라이더 컴포넌트
export const SoundSlider = ({ label, soundKey, fileName, initialVolume }: {
    label: string;
    soundKey: SoundKey;
    fileName: string;
    initialVolume: number;
  }) => {  
    // zustand + asyncStorage 연동 훅 사용
    const { volumes, setVolume } = useSoundVolumes();
    const [containerWidth, setContainerWidth] = useState(0);
    // 네이티브 오디오 제어 훅
    const { handleSlider } = useSoundPlayer(soundKey, fileName, initialVolume);

    // 볼륨 변경 핸들러
    const handleSliderAndStore = (value: number) => {
      setVolume(soundKey, value); // store/asyncStorage에 저장
      handleSlider(value);        // 네이티브 모듈 제어
    };

    // 최초 마운트 시 볼륨이 0 초과면 자동 재생 (기존 로직 유지)
    useEffect(() => {
      if (initialVolume > 0) {
        handleSliderAndStore(initialVolume);
      }
    }, []);

    const volume = volumes[soundKey] ?? 0;

    return (
      <View 
      className="w-full mb-8"
      >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          {/* <Text text={label}/> */}
        </View>
        <View className="w-full flex-row items-center">
        {iconMap[soundKey]}
        <View 
          className="ml-4 flex-1 justify-center items-start"
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
        <Slider
          min={0}
          max={1}
          step={0.01}
          width={containerWidth > 0 ? containerWidth : 200}
          height={30}
          value={volume}
          onChange={handleSliderAndStore}
        />
        <Text text={`${Math.floor(volume * 100)}`} type="semibold" className="absolute left-4"/>
        </View>
        </View>
      </View>
    );
  }