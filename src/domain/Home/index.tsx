import React, { useRef, useEffect } from 'react';
import { View ,ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Background } from '../../shared/components/Background';
import { Text } from '../../shared/components/Text';
import { SoundPlayer } from './components/SoundPlayer';
import { FOREGROUND_HEIGHT } from '../../shared/constants/normal'
import {Foreground} from './components/Foreground'
import { useSoundVolumeStore } from '../../shared/store/soundVolumeStore';
import ShuffleIcon from "../../../assets/svgs/Shuffle.svg"
import PlayIcon from "../../../assets/svgs/Play.svg"
import PauseIcon from "../../../assets/svgs/Pause.svg"
import ClockIcon from "../../../assets/svgs/Clock.svg"
import {Colors} from "../../shared/constants/Colors"
import { useTimerModalStore } from '../../shared/store/timerModalStore';
import { usePresetActions } from '../../shared/hooks/usePreset';
import {presetList} from '../../shared/constants/sound'
export function HomeScreen() {
  const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
  const { setRandomVolumesAndSyncPreset, selectedPreset, setSelectedPreset } = usePresetActions();
  const { isPaused, pause, resume } = useSoundVolumeStore();
  const { open, remainingSeconds, timerRunning } = useTimerModalStore();
  // Animated width 값 준비
  const animatedWidth = useRef(new Animated.Value(remainingSeconds > 0 ? 140 : 64)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: remainingSeconds > 0 ? 140 : 64,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [remainingSeconds]);

  const handlePauseToggle = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };
  const presetHandler = (index:number)=>{
    setSelectedPreset(index);
  }

  return (
    <Background isStatusBarGap={true}>
      <View className='flex-1'>
        {/* foreground svgs */}
        <Foreground/>
        {/* controller section container */}
        <ScrollView
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingBottom: 0, flexGrow: 1}}
        >
          <View className="flex-1 justify-between">
          {/* absolute인 foreground svgs를 가리지 않기 위한 빈 공간 */}
          <View style={foregroundStyle} className=""/>
          {/* bottom sheet */}
          <View className="mt-16 w-full rounded-t-3xl pb-16 bg-controller">
            {/* bottom sheet handle */}
            <View className="my-4 w-full items-center justify-center">
            <View className="h-2 bg-line rounded-2xl w-1/6"/>
            </View>
            {/* controller container (controller + sliders) */}
            <View className="px-8">
            <View className="h-4"/>

              {/* controller */}
              <View className=" w-full flex-row justify-between items-center mb-4 bg-background rounded-full p-2 ">
                {/* random button */}
                <TouchableOpacity 
                  className="h-16 w-16 items-center justify-center rounded-full bg-controller" 
                  onPress={setRandomVolumesAndSyncPreset}
                >
                  <ShuffleIcon width={24} height={24} color={Colors.line} />
                </TouchableOpacity>
                {/* pause button */}
                <TouchableOpacity 
                  className={`h-16 w-16 items-center justify-center rounded-full bg-controller`}
                  onPress={handlePauseToggle}
                >
                  {isPaused ? (
                    <View style={{ marginLeft: 4 }}>
                      <PlayIcon width={24} height={24} color={Colors.line} fill={Colors.line}/>
                    </View>
                  ) : (
                   <PauseIcon width={24} height={24} color={Colors.line}/>
                  )}
                </TouchableOpacity>
                {/* timer button + 시간 표시 */}
                <Animated.View style={{ width: animatedWidth }}>
                  <TouchableOpacity 
                    style={{
                      height: 64,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 32,
                      backgroundColor: Colors.controller,
                      paddingHorizontal: 8,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    onPress={open}
                    activeOpacity={0.8}
                  >
                    <ClockIcon width={24} height={24} color={Colors.line} />
                    {remainingSeconds > 0 && (
                    <Text
                      className="ml-2 text-base text-gray-700 font-semibold"
                      text={
                        `${Math.floor(remainingSeconds / 3600) > 0 ? Math.floor(remainingSeconds / 3600) + '시간 ' : ''}` +
                        `${Math.floor((remainingSeconds % 3600) / 60) > 0 ? Math.floor((remainingSeconds % 3600) / 60) + '분 ' : ''}`
                      }
                    />
                  )}
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* preset selector */}
              <View className="w-full flex-row mt-4 mb-6">
                {presetList.map((_, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className={`mx-2 py-2 px-4 rounded-3xl ${selectedPreset==idx?'bg-line':'bg-background'}`}
                    onPress={() => presetHandler(idx)}
                  >
                    <Text
                      text={`preset ${idx + 1}`}
                      style={{ color: `${selectedPreset==idx?Colors.background:Colors.line}` }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {/* sliders */}
            <SoundPlayer />
            </View>
          </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}