import { create } from 'zustand';
import { presetList } from '../constants/sound';

type PresetContentType = { key: string, volume: number }

/**
 * 프리셋 스토어 상태 인터페이스
 */
interface PresetState {
  isPresetExistInAsyncStorage: boolean;
  presets: PresetContentType[][]; // 저장된 모든 프리셋 목록
  selectedPreset: number; // 현재 로드된 프리셋 인덱스
  setSelectedPreset:(index:number)=>void;
  updatePreset: (index: number, preset: PresetContentType[]) => void; // 프리셋 수정
  isPresetLoaded: boolean;
  setPresetLoaded: (loaded: boolean) => void;
}

/**
 * 프리셋 스토어
 * 사운드 조합을 저장하고 관리하는 기능을 제공
 */
export const usePresetStore = create<PresetState>((set, get) => ({
  presets: presetList,
  selectedPreset: 0,
  isPresetExistInAsyncStorage: false,
  isPresetLoaded: false,
  setPresetLoaded: (loaded) => set({ isPresetLoaded: loaded }),
  
  setSelectedPreset: (index) => {
    set({ selectedPreset: index });
  },
  /**
   * 기존 프리셋을 수정
   * @param index 수정할 프리셋 인덱스
   * @param preset 새로운 프리셋 데이터
   */
  updatePreset: (index, preset) => {
    set((state) => ({
      presets: state.presets.map((p, i) =>
        i === index ? preset : p
      ),
    }));
  },
  
}));
