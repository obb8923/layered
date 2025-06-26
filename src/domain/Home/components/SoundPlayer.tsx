import React from 'react';
import { View } from 'react-native';
import { soundList } from '../../../shared/constants/sound';
import { SoundSlider } from './SoundSlider';

// 여러 음원을 받아서 렌더링하는 메인 컴포넌트
export const SoundPlayer = () => {
  return (
    <View style={{ marginTop: 24 }}>
      {soundList.map(sound => (
        <SoundSlider
          key={sound.key}
          label={sound.label}
          soundKey={sound.key}
          fileName={sound.fileName}
          initialVolume={sound.defaultVolume}
        />
      ))}
    </View>
  );
}; 