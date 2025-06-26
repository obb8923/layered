import {View} from 'react-native';
import {useState} from 'react';
import React from 'react';
import {Colors} from '../../../shared/constants/Colors'
import { FOREGROUND_HEIGHT } from '../../../shared/constants/normal'
import Mountain from '../../../../assets/svgs/Mountain.svg'
import Sun from '../../../../assets/svgs/Sun.svg'
import River from '../../../../assets/svgs/River.svg'
import Frog from '../../../../assets/svgs/Frog.svg'
import Rain1 from '../../../../assets/svgs/Rain1.svg'
import Rain2 from '../../../../assets/svgs/Rain2.svg'
import Bonfire from '../../../../assets/svgs/Bonfire.svg'
import Tree from '../../../../assets/svgs/Tree.svg'
import Bird1 from '../../../../assets/svgs/Bird1.svg'
import Cricket1 from '../../../../assets/svgs/Cricket1.svg'
import { soundList } from '../../../shared/constants/sound';
import { useSoundVolumeStore } from '../../../shared/store/soundVolumeStore';

export const Foreground = () => {
    const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    // zustand store에서 모든 음원의 볼륨 가져오기
    const volumes = useSoundVolumeStore(state => state.volumes);
    const soundVolumes = soundList.map(sound => ({
      key: sound.key,
      label: sound.label,
      volume: volumes[sound.key] ?? sound.defaultVolume
    }));

    // Rain1, Rain2 볼륨 값 추출
    const rain1Volume = volumes["rain1"] ?? soundList.find(s => s.key === "rain1")?.defaultVolume ?? 0;
    const rain2Volume = volumes["rain2"] ?? soundList.find(s => s.key === "rain2")?.defaultVolume ?? 0;
    const showSun = rain1Volume === 0 && rain2Volume === 0;
    const showRain1 = rain1Volume > 0;
    const showRain2 = rain2Volume > 0;

    // 추가: Bonfire, Frog, River, Bird1 볼륨 값 및 표시 조건
    const bonfireVolume = volumes["fire1"] ?? soundList.find(s => s.key === "fire1")?.defaultVolume ?? 0;
    const frogVolume = volumes["frog1"] ?? soundList.find(s => s.key === "frog1")?.defaultVolume ?? 0;
    const riverVolume = volumes["river1"] ?? soundList.find(s => s.key === "river1")?.defaultVolume ?? 0;
    const birdVolume = volumes["bird1"] ?? soundList.find(s => s.key === "bird1")?.defaultVolume ?? 0;
    const showBonfire = bonfireVolume > 0;
    const showFrog = frogVolume > 0;
    const showRiver = riverVolume > 0;
    const showBird = birdVolume > 0;

    // Frog 개수 계산
    let frogCount = 0;
    if (frogVolume > 0 && frogVolume <= 0.33) frogCount = 1;
    else if (frogVolume > 0.33 && frogVolume <= 0.66) frogCount = 2;
    else if (frogVolume > 0.66) frogCount = 3;

    // Bird1 개수 계산
    let birdCount = 0;
    if (birdVolume > 0 && birdVolume <= 0.5) birdCount = 1;
    else if (birdVolume > 0.5) birdCount = 2;

    const cricketsVolume = volumes["crickets1"] ?? soundList.find(s => s.key === "crickets1")?.defaultVolume ?? 0;
    const showCricket = cricketsVolume > 0;

    return (
        <View className="absolute top-0 bottom-0 left-0 right-0 w-full justice-center items-center px-8" style={foregroundStyle}>
        <View 
        className="w-full h-full"
        onLayout={e => {
            setContainerHeight(e.nativeEvent.layout.height)
            setContainerWidth(e.nativeEvent.layout.width)
        }}
        >

        {/* 조건부 렌더링: Sun, Rain1, Rain2 */}
        {showSun && (
          <Sun 
            style={{
                height: containerHeight / 6, width: containerHeight / 6,
                position: 'absolute',
                top: containerHeight * 0.05, left: containerWidth * 0.05,
                color: Colors.line
            }}
          />
        )}
        {showRain1 && (
          <Rain1 
            style={{
                height: containerHeight / 6, width: containerHeight / 6,
                position: 'absolute',
                top: containerHeight * 0.05, left: containerWidth * 0.05,
                color: Colors.line
            }}
          />
        )}
        {showRain2 && (
          <Rain2 
            style={{
                height: containerHeight / 6, width: containerHeight / 6,
                position: 'absolute',
                top: containerHeight * 0.1, left: containerWidth * 0.19,
                color: Colors.line
            }}
          />
        )}

        {/* 조건부 렌더링: River */}
        {showRiver && (
          <River 
            style={{
                height: containerHeight / 2, width: containerWidth / 2,
                position: 'absolute',
                bottom: containerHeight * 0.01, left: containerWidth * 0.25,
                color: Colors.line
            }}
          />
        )}

        {/* 조건부 렌더링: Frog 여러 마리 */}
        {frogCount >= 1 && (
          <Frog 
            style={{
                height: containerHeight / 8, width: containerHeight / 8,
                position: 'absolute',
                bottom: containerHeight * 0.01, left: containerWidth * 0.25,
                color: Colors.line
            }}
          />
        )}
        {frogCount >= 2 && (
          <Frog 
            style={{
                height: containerHeight / 8, width: containerHeight / 8,
                position: 'absolute',
                bottom: containerHeight * 0.02, left: containerWidth * 0.15,
                color: Colors.line
            }}
          />
        )}
        {frogCount === 3 && (
          <Frog 
            style={{
                height: containerHeight / 8, width: containerHeight / 8,
                position: 'absolute',
                bottom: containerHeight * 0.1, left: containerWidth * 0.23,
                color: Colors.line
            }}
          />
        )}

        {/* 조건부 렌더링: Bonfire */}
        {showBonfire && (
          <Bonfire 
            style={{
                height: containerHeight / 8, width: containerHeight / 8,
                position: 'absolute',
                bottom: containerHeight * 0.3, left: containerWidth * 0.11,
                color: Colors.line
            }}
          />
        )}

        {/* 조건부 렌더링: Bird1 여러 마리 */}
        {birdCount >= 1 && (
          <Bird1
            style={{
                height: containerHeight / 5, width: containerHeight / 10,
                position: 'absolute',
                bottom: containerHeight * 0.3, right: containerWidth * 0.18,
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
        )}
        {birdCount === 2 && (
          <Bird1
            style={{
                height: containerHeight / 5, width: containerHeight / 10,
                position: 'absolute',
                bottom: containerHeight * 0.24, right: containerWidth * 0.03,
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
        )}

        <Mountain 
        style={{
            height: containerHeight / 2, width: containerWidth / 2,
            position: 'absolute',
            top: containerHeight * 0.0, right: containerWidth * 0.0,
            color: Colors.line
        }}
        />
         <Mountain 
        style={{
            height: containerHeight / 2.5, width: containerWidth / 2.5,
            position: 'absolute',
            top: containerHeight * 0.1, right: containerWidth * 0.35,
            color: Colors.line,
            transform: [{ scaleX: -1 }]
        }}
        />

        <Tree 
        style={{
            height: containerHeight / 3.5, width: containerHeight / 6.5,
            position: 'absolute',
            bottom: containerHeight * 0.1, right: containerWidth * 0.15,
            color: Colors.line
        }}
        />
         <Tree 
        style={{
            height: containerHeight / 3, width: containerHeight / 6,
            position: 'absolute',
            bottom: containerHeight * 0, right: containerWidth * 0,
            color: Colors.line
        }}
        />
          <Tree 
        style={{
            height: containerHeight / 5, width: containerHeight / 10,
            position: 'absolute',
            bottom: containerHeight * 0.35, left: containerWidth * 0.05,
            color: Colors.line
        }}
        />
        {showCricket&&
         <Cricket1
            style={{
                height: containerHeight / 14, width: containerHeight / 14,
                position: 'absolute',
                bottom: containerHeight * 0, right: containerWidth * 0.09,
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
          }
        </View>
      </View>
    )
}