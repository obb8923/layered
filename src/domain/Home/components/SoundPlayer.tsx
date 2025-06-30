import React from 'react';
import { View } from 'react-native';
import { soundList } from '../../../shared/constants/sound';
import { SoundSlider } from './SoundSlider';
import { useSoundVolumes } from '../../../shared/hooks/useSoundVolumes';

// 여러 음원을 받아서 렌더링하는 메인 컴포넌트
export const SoundPlayer = () => {
  const { volumes } = useSoundVolumes();
  return (
    <View>
      {soundList.map(sound => (
        <SoundSlider
          key={sound.key}
          label={sound.label}
          soundKey={sound.key}
          fileName={sound.fileName}
          initialVolume={volumes[sound.key] ?? sound.defaultVolume}
        />
      ))}
    </View>
  );
}; 