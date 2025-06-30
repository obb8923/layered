import React from 'react';
import { View ,ScrollView, TouchableOpacity} from 'react-native';
import { Background } from '../../shared/components/Background';
import { Text } from '../../shared/components/Text';
import { SoundPlayer } from './components/SoundPlayer';
import { FOREGROUND_HEIGHT } from '../../shared/constants/normal'
import {Foreground} from './components/Foreground'
import { useSoundVolumes } from '../../shared/hooks/useSoundVolumes';
import { useSoundVolumeStore } from '../../shared/store/soundVolumeStore';

export function HomeScreen() {
  const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
  const { setRandomVolumes } = useSoundVolumes();
  const { isPaused, pause, resume } = useSoundVolumeStore();

  const handlePauseToggle = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

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
          <View className="mt-16 w-full rounded-t-3xl pb-16" style={{backgroundColor:"#33354B"}}>
            {/* bottom sheet handle */}
            <View className="my-4 w-full items-center justify-center">
            <View className="h-2 bg-line rounded-2xl w-1/6"/>
            </View>
            {/* controller */}
            <View className="px-8">
              <View className="w-full flex-row justify-between items-center mb-4">
                <TouchableOpacity 
                  className="h-16 w-16 bg-green-500 rounded-lg items-center justify-center" 
                  onPress={setRandomVolumes}
                >
                  <Text text="랜덤" className="text-white font-bold" />
                </TouchableOpacity>
                <TouchableOpacity 
                  className={`h-16 w-16 rounded-lg items-center justify-center ${isPaused ? 'bg-green-500' : 'bg-orange-500'}`}
                  onPress={handlePauseToggle}
                >
                  <Text 
                    text={isPaused ? '재생' : '일시정지'} 
                    className="text-white font-bold"
                  />
                </TouchableOpacity>
              </View>
            <SoundPlayer />
            </View>
          </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}