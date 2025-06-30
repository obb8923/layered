import {View, Animated} from 'react-native';
import {useState, useEffect, useRef} from 'react';
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

    // Rain1, Rain2 볼륨 값 추출
    const rain1Volume = volumes["rain1"] ?? 0;
    const rain2Volume = volumes["rain2"] ?? 0;
    const showSun = rain1Volume === 0 && rain2Volume === 0;
    const showRain1 = rain1Volume > 0;
    const showRain2 = rain2Volume > 0;

    // 추가: Bonfire, Frog, River, Bird1 볼륨 값 및 표시 조건
    const bonfireVolume = volumes["fire1"] ?? 0;
    const frogVolume = volumes["frog1"] ?? 0;
    const riverVolume = volumes["river1"] ?? 0;
    const birdVolume = volumes["bird1"] ?? 0;
    const showBonfire = bonfireVolume > 0;
    const showRiver = riverVolume > 0;

    // Frog 개수 계산
    let frogCount = 0;
    if (frogVolume > 0 && frogVolume <= 0.33) frogCount = 1;
    else if (frogVolume > 0.33 && frogVolume <= 0.66) frogCount = 2;
    else if (frogVolume > 0.66) frogCount = 3;

    // Bird1 개수 계산
    let birdCount = 0;
    if (birdVolume > 0 && birdVolume <= 0.5) birdCount = 1;
    else if (birdVolume > 0.5) birdCount = 2;

    const cricketsVolume = volumes["crickets1"] ?? 0;
    const showCricket = cricketsVolume > 0;

    // Animated values for each element
    const sunOpacity = useRef(new Animated.Value(0)).current;
    const rain1Opacity = useRef(new Animated.Value(0)).current;
    const rain2Opacity = useRef(new Animated.Value(0)).current;
    const riverOpacity = useRef(new Animated.Value(0)).current;
    const bonfireOpacity = useRef(new Animated.Value(0)).current;
    const frog1Opacity = useRef(new Animated.Value(0)).current;
    const frog2Opacity = useRef(new Animated.Value(0)).current;
    const frog3Opacity = useRef(new Animated.Value(0)).current;
    const bird1Opacity = useRef(new Animated.Value(0)).current;
    const bird2Opacity = useRef(new Animated.Value(0)).current;
    const cricketOpacity = useRef(new Animated.Value(0)).current;

    // Animation duration
    const animationDuration = 500;

    // Animate sun
    useEffect(() => {
        Animated.timing(sunOpacity, {
            toValue: showSun ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showSun, sunOpacity]);

    // Animate rain1
    useEffect(() => {
        Animated.timing(rain1Opacity, {
            toValue: showRain1 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showRain1, rain1Opacity]);

    // Animate rain2
    useEffect(() => {
        Animated.timing(rain2Opacity, {
            toValue: showRain2 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showRain2, rain2Opacity]);

    // Animate river
    useEffect(() => {
        Animated.timing(riverOpacity, {
            toValue: showRiver ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showRiver, riverOpacity]);

    // Animate bonfire
    useEffect(() => {
        Animated.timing(bonfireOpacity, {
            toValue: showBonfire ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showBonfire, bonfireOpacity]);

    // Animate frogs
    useEffect(() => {
        Animated.timing(frog1Opacity, {
            toValue: frogCount >= 1 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [frogCount, frog1Opacity]);

    useEffect(() => {
        Animated.timing(frog2Opacity, {
            toValue: frogCount >= 2 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [frogCount, frog2Opacity]);

    useEffect(() => {
        Animated.timing(frog3Opacity, {
            toValue: frogCount === 3 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [frogCount, frog3Opacity]);

    // Animate birds
    useEffect(() => {
        Animated.timing(bird1Opacity, {
            toValue: birdCount >= 1 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [birdCount, bird1Opacity]);

    useEffect(() => {
        Animated.timing(bird2Opacity, {
            toValue: birdCount === 2 ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [birdCount, bird2Opacity]);

    // Animate cricket
    useEffect(() => {
        Animated.timing(cricketOpacity, {
            toValue: showCricket ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [showCricket, cricketOpacity]);

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
        <Animated.View style={{ 
            opacity: sunOpacity, 
            position: 'absolute',
            top: containerHeight * 0.05, 
            left: containerWidth * 0.05,
            height: containerHeight / 6, 
            width: containerHeight / 6
        }}>
          <Sun 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>
        <Animated.View style={{ 
            opacity: rain1Opacity, 
            position: 'absolute',
            top: containerHeight * 0.05, 
            left: containerWidth * 0.05,
            height: containerHeight / 6, 
            width: containerHeight / 6
        }}>
          <Rain1 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>
        <Animated.View style={{ 
            opacity: rain2Opacity, 
            position: 'absolute',
            top: containerHeight * 0.1, 
            left: containerWidth * 0.19,
            height: containerHeight / 6, 
            width: containerHeight / 6
        }}>
          <Rain2 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>

        {/* 조건부 렌더링: River */}
        <Animated.View style={{ 
            opacity: riverOpacity, 
            position: 'absolute',
            bottom: containerHeight * 0.01, 
            left: containerWidth * 0.25,
            height: containerHeight / 2, 
            width: containerWidth / 2
        }}>
          <River 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>

        {/* 조건부 렌더링: Frog 여러 마리 */}
        <Animated.View style={{ 
            opacity: frog1Opacity, 
            position: 'absolute',
            bottom: containerHeight * 0.01, 
            left: containerWidth * 0.25,
            height: containerHeight / 8, 
            width: containerHeight / 8
        }}>
          <Frog 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>
        <Animated.View style={{ 
            opacity: frog2Opacity, 
            position: 'absolute',
            bottom: containerHeight * 0.02, 
            left: containerWidth * 0.15,
            height: containerHeight / 8, 
            width: containerHeight / 8
        }}>
          <Frog 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>
        <Animated.View style={{ 
            opacity: frog3Opacity, 
            position: 'absolute',
            bottom: containerHeight * 0.1, 
            left: containerWidth * 0.23,
            height: containerHeight / 8, 
            width: containerHeight / 8
        }}>
          <Frog 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>

        {/* 조건부 렌더링: Bonfire */}
        <Animated.View style={{ 
            opacity: bonfireOpacity, 
            position: 'absolute',
            bottom: containerHeight * 0.3, 
            left: containerWidth * 0.11,
            height: containerHeight / 8, 
            width: containerHeight / 8
        }}>
          <Bonfire 
            style={{
                color: Colors.line
            }}
          />
        </Animated.View>

        {/* 조건부 렌더링: Bird1 여러 마리 */}
        <Animated.View style={{ 
            opacity: bird1Opacity, 
            position: 'absolute',
            bottom: containerHeight * 0.3, 
            right: containerWidth * 0.18,
            height: containerHeight / 5, 
            width: containerHeight / 10
        }}>
          <Bird1
            style={{
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
        </Animated.View>
        <Animated.View style={{ 
            opacity: bird2Opacity, 
            position: 'absolute',
            bottom: containerHeight * 0.24, 
            right: containerWidth * 0.03,
            height: containerHeight / 5, 
            width: containerHeight / 10
        }}>
          <Bird1
            style={{
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
        </Animated.View>

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
        <Animated.View style={{ 
            opacity: cricketOpacity, 
            position: 'absolute',
            bottom: containerHeight * 0, 
            right: containerWidth * 0.09,
            height: containerHeight / 14, 
            width: containerHeight / 14
        }}>
         <Cricket1
            style={{
                color: Colors.line,
                transform: [{ scaleX: -1 }]
            }}
          />
        </Animated.View>
        </View>
      </View>
    )
}