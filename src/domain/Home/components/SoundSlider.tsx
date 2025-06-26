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
      >
        <View style={{flexDirection:'row', alignItems:'center'}}>
          {/* <Text text={label}/> */}
        </View>
        <View className="w-full flex-row items-center">
        {iconMap[label]}
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
          onChange={handleSlider}
        />
        <Text text={`${Math.floor(volume * 100)}`} type="semibold" className="absolute left-4"/>
        </View>
        </View>
      </View>
    );
  }