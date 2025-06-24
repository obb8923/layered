import React from 'react';
import { View } from 'react-native';
import { defaultVolume } from '../constants/Sound';
import { SoundSlider } from './SoundSlider';

// 여러 음원을 받아서 렌더링하는 메인 컴포넌트
export const SoundPlayer = () => {
  // 음원 목록을 배열로 관리 (확장 가능)
  const sounds = [
    { label: 'rain1', key: 'rain1', file: 'rain1', initialVolume: defaultVolume.rain1 },
    { label: 'rain2', key: 'rain2', file: 'rain2', initialVolume: defaultVolume.rain2 },
    { label: 'frog1', key: 'frog1', file: 'frog1', initialVolume: defaultVolume.frog1},
    { label: 'wind1', key: 'wind1', file: 'wind1', initialVolume: defaultVolume.wind1},
    { label: 'river1', key: 'river1', file: 'river1', initialVolume: defaultVolume.river1},
    { label: 'fire1', key: 'fire1', file: 'fire1', initialVolume: defaultVolume.fire1},
    { label: 'bird1', key: 'bird1', file: 'bird1', initialVolume: defaultVolume.bird1},
    { label: 'crickets1', key: 'crickets1', file: 'crickets1', initialVolume: defaultVolume.crickets1}


  ];

  return (
    <View style={{ marginTop: 24 }}>
      {sounds.map(sound => (
        <SoundSlider
          key={sound.key}
          label={sound.label}
          soundKey={sound.key}
          fileName={sound.file}
          initialVolume={sound.initialVolume}
        />
      ))}
    </View>
  );
}; 