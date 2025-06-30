import React from 'react';
import { Modal, View, TouchableOpacity} from 'react-native';
import Slider from './Slider';
import { useTimerModalStore } from '../store/timerModalStore';
import {Text} from "../../shared/components/Text"
import { useSoundVolumeStore } from '../store/soundVolumeStore';

export function TimerModal() {
  const { isOpen, minutes, setMinutes, close, startTimer } = useTimerModalStore();
  const { isPaused, resume } = useSoundVolumeStore();
  const [sliderWidth, setSliderWidth] = React.useState(0);

  const handleConfirm = () => {
    if (isPaused) resume();
    if(minutes > 0)startTimer();
    close();
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
        {/* background shadow */}
      <View className="flex-1 bg-black/60 justify-center items-center">
      {/* container */}
        <View className="w-5/6 bg-controller rounded-2xl p-6 items-center relative">
          {/* 오른쪽 위 X 버튼 (View로 네모 X) */}
          <TouchableOpacity className="absolute top-0 right-[-18] w-14 h-14 p-1 items-center justify-center z-10 bg-controller rounded-full" onPress={handleConfirm}>
            <View className="items-center justify-center bg-background w-full h-full p-2 rounded-full">
            <View className="w-6 h-1 bg-white absolute" style={{ transform: [{ rotate: '45deg' }] }} />
            <View className="w-6 h-1 bg-white absolute" style={{ transform: [{ rotate: '-45deg' }] }} />
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
            {/* <TouchableOpacity
              className="px-4 py-2 mx-1 rounded-full border border-gray-300"
              onPress={() => setMinutes(0.0833)}
            >
              <Text className="text-base text-gray-700" text="5s"/>
            </TouchableOpacity> */}
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
          onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}>
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
        </View>
      </View>
    </Modal>
  );
}