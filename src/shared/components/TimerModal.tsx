import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Slider from './Slider';
import { useTimerModalStore } from '../store/timerModalStore';
import {Text} from "../../shared/components/Text"
import { useSoundVolumeStore } from '../store/soundVolumeStore';
import {Colors} from '../constants/Colors'
export function TimerModal() {
  const { isOpen, minutes, setMinutes, close, startTimer } = useTimerModalStore();
  const { isPaused, resume } = useSoundVolumeStore();
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [visible, setVisible] = React.useState(false);

  const handleConfirm = () => {
    if (isPaused) resume();
    if(minutes > 0)startTimer();
    close();
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        setVisible(false);
      });
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents={isOpen ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.6)',
        opacity: opacity,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          width: '83%',
          backgroundColor: Colors.controller,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          position: 'relative',
          transform: [{ translateY }],
        }}
      >
        {/* 오른쪽 위 X 버튼 (View로 네모 X) */}
        <TouchableOpacity style={{ position: 'absolute', top: 0, right: -18, width: 56, height: 56, padding: 4, alignItems: 'center', justifyContent: 'center', zIndex: 10, backgroundColor: Colors.controller, borderRadius: 28 }} onPress={handleConfirm}>
          <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, width: '100%', height: '100%', padding: 8, borderRadius: 28 }}>
            <View style={{ width: 24, height: 4, backgroundColor: 'white', position: 'absolute', transform: [{ rotate: '45deg' }] }} />
            <View style={{ width: 24, height: 4, backgroundColor: 'white', position: 'absolute', transform: [{ rotate: '-45deg' }] }} />
          </View>
        </TouchableOpacity>
        <Text className="text-xl font-bold mb-4" text="Timer"/>
        <Text className="text-lg mb-4" text={`${Math.floor(minutes / 60)}h ${Math.floor(minutes % 60)}m`}></Text>
        <View className="flex-row mb-4 w-full justify-center justify-evenly">
          <TouchableOpacity
            className="px-4 py-2 mx-1 rounded-full border border-gray-300"
            onPress={() => setMinutes(0)}
          >
            <Text className="text-base text-gray-700" text="off"/>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 mx-1 rounded-full border border-gray-300"
            onPress={() => setMinutes(Math.min(minutes + 30, 360))}
          >
            <Text className="text-base text-gray-700" text="30m"/>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 mx-1 rounded-full border border-gray-300"
            onPress={() => setMinutes(Math.min(minutes + 60, 360))}
          >
            <Text className="text-base text-gray-700" text="1h"/>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 mx-1 rounded-full border border-gray-300"
            onPress={() => setMinutes(Math.min(minutes + 180, 360))}
          >
            <Text className="text-base text-black" text="3h"/>
          </TouchableOpacity>
        </View>
        <View
          className="w-full justify-center items-center"
          onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
          pointerEvents="none"
        >
          {sliderWidth > 0 && (
            <Slider
              min={0}
              max={360}
              step={5}
              value={minutes}
              onChange={setMinutes}
              width={sliderWidth}
              height={36}
            />
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}