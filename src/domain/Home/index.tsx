import React from 'react';
import { View ,ScrollView, TouchableOpacity} from 'react-native';
import { Background } from '../../shared/components/Background';
import { Text } from '../../shared/components/Text';
import { SoundPlayer } from './components/SoundPlayer';
import { FOREGROUND_HEIGHT } from '../../shared/constants/normal'
import {Foreground} from './components/Foreground'
import { useSoundVolumes } from '../../shared/hooks/useSoundVolumes';
import { useSoundVolumeStore } from '../../shared/store/soundVolumeStore';
import ShuffleIcon from "../../../assets/svgs/Shuffle.svg"
import PlayIcon from "../../../assets/svgs/Play.svg"
import PauseIcon from "../../../assets/svgs/Pause.svg"


import {Colors} from "../../shared/constants/Colors"

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
                  onPress={setRandomVolumes}
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
              </View>
              <View className="h-4"/>
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