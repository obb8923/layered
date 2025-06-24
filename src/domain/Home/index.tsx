import React from 'react';
import { View ,ScrollView} from 'react-native';
import { Background } from '../../shared/components/Background';
import { Text } from '../../shared/components/Text';
import { SoundPlayer } from './components/SoundPlayer';
import { FOREGROUND_HEIGHT } from '../../shared/constants/normal'

export function HomeScreen() {
  const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
  return (
    <Background isStatusBarGap={true}>
      <View className='flex-1'>
        {/* foreground svgs */}
        <View className="absolute top-0 bottom-0 left-0 right-0 w-full justice-center items-center px-8" style={foregroundStyle}>
          <View className="w-full h-full bg-white/50 rounded-xl"></View>
        </View>
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
            <SoundPlayer />
           

            </View>
          </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}