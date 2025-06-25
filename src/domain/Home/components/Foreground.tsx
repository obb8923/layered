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

export const Foreground = () => {
    const foregroundStyle = {height:FOREGROUND_HEIGHT,marginTop:24}
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    return (
        <View className="absolute top-0 bottom-0 left-0 right-0 w-full justice-center items-center px-8" style={foregroundStyle}>
        <View 
        className="w-full h-full"
        onLayout={e => {
            setContainerHeight(e.nativeEvent.layout.height)
            setContainerWidth(e.nativeEvent.layout.width)
        }}
        >

        <Sun style={{height:containerHeight/4,width:containerHeight/2,position:'absolute',top:0,left:0}} fill={Colors.line}/>
        <Mountain style={{height:containerHeight/2,width:containerWidth/2,position:'absolute',top:0,right:0}} fill={Colors.line}/>
        <River style={{height:containerHeight/2,width:containerHeight/2,position:'absolute',bottom:0,left:containerWidth/2,right:0}} fill={Colors.line}/>
        <Frog style={{height:containerHeight/4,width:containerHeight/4,position:'absolute',bottom:0,left:0}} fill={Colors.line}/>
        <Rain1 style={{height:containerHeight/4,width:containerHeight/4,position:'absolute',top:0,left:0}} fill={Colors.line}/>
        <Rain2 style={{height:containerHeight/4,width:containerHeight/4,position:'absolute',top:0,left:0}} fill={Colors.line} />
        <Bonfire style={{height:containerHeight/4,width:containerHeight/4,position:'absolute',bottom:0,left:0}}fill={Colors.line}/>
        <Tree style={{height:containerHeight/2,width:containerHeight/4,position:'absolute',bottom:0,right:0,backgroundColor:'#fff'}} fill={Colors.line}/>

        </View>
      </View>
    )
}