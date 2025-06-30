import React from 'react';
import { View ,ScrollView} from 'react-native';
import { Background } from '../../shared/components/Background';
import { Text } from '../../shared/components/Text';
import { SoundPlayer } from './components/SoundPlayer';
import { FOREGROUND_HEIGHT } from '../../shared/constants/normal'
import {Foreground} from './components/Foreground'
import { useSoundVolumes } from '../../shared/hooks/useSoundVolumes';
export function HomeScreen() {
  const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
  const { setRandomVolumes } = useSoundVolumes();

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
              <View className="w-full flex-row justify-between items-center">
                <View className="h-16 w-16 bg-green-500" onTouchEnd={()=>{setRandomVolumes()}}></View>
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