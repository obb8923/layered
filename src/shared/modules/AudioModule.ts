import { NativeModules } from 'react-native';

const { AudioModule } = NativeModules;

export default {
  play: (key: string, fileName: string) => AudioModule.play(key, fileName),
  stop: (key: string) => AudioModule.stop(key),
  setVolume: (key: string, volume: number) => AudioModule.setVolume(key, volume),
  pause: () => AudioModule.pause(),
  resume: () => AudioModule.resume(),
}; 