import {View} from 'react-native';
import {useState} from 'react';
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

    return (
        <View className="absolute top-0 bottom-0 left-0 right-0 w-full justice-center items-center px-8" style={foregroundStyle}>
        <View 
        className="w-full h-full"
        onLayout={e => {
            setContainerHeight(e.nativeEvent.layout.height)
            setContainerWidth(e.nativeEvent.layout.width)
        }}
        >

        <Sun 
        style={{
            height: containerHeight / 6, width: containerHeight / 6,
            position: 'absolute',
            top: containerHeight * 0.05, left: containerWidth * 0.05,
            color: Colors.line
        }}
        />

        <Rain1 
        style={{
            height: containerHeight / 6, width: containerHeight / 6,
            position: 'absolute',
            top: containerHeight * 0.05, left: containerWidth * 0.05,
            color: Colors.line
        }}
        />
        <Rain2 
        style={{
            height: containerHeight / 6, width: containerHeight / 6,
            position: 'absolute',
            top: containerHeight * 0.1, left: containerWidth * 0.19,
            color: Colors.line
        }}
        />

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
         <Bird1
        style={{
            height: containerHeight / 5, width: containerHeight / 10,
            position: 'absolute',
            bottom: containerHeight * 0.3, right: containerWidth * 0.18,
            color: Colors.line,
            transform: [{ scaleX: -1 }]
            
        }}
        />
         <Bird1
        style={{
            height: containerHeight / 5, width: containerHeight / 10,
            position: 'absolute',
            bottom: containerHeight * 0.24, right: containerWidth * 0.03,
            color: Colors.line,
            transform: [{ scaleX: -1 }]
            
        }}
        />

        <River 
        style={{
            height: containerHeight / 2, width: containerWidth / 2,
            position: 'absolute',
            bottom: containerHeight * 0.01, left: containerWidth * 0.25,
            color: Colors.line
        }}
        />

        <Frog 
        style={{
            height: containerHeight / 8, width: containerHeight / 8,
            position: 'absolute',
            bottom: containerHeight * 0.01, left: containerWidth * 0.25,
            color: Colors.line
        }}
        />
         <Frog 
        style={{
            height: containerHeight / 8, width: containerHeight / 8,
            position: 'absolute',
            bottom: containerHeight * 0.02, left: containerWidth * 0.15,
            color: Colors.line
        }}
        />
          <Frog 
        style={{
            height: containerHeight / 8, width: containerHeight / 8,
            position: 'absolute',
            bottom: containerHeight * 0.1, left: containerWidth * 0.23,
            color: Colors.line
        }}
        />

        <Bonfire 
        style={{
            height: containerHeight / 8, width: containerHeight / 8,
            position: 'absolute',
            bottom: containerHeight * 0.3, left: containerWidth * 0.11,
            color: Colors.line
        }}
        />
        </View>
      </View>
    )
}