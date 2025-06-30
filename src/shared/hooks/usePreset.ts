import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePresetStore } from '../store/presetStore';
import { presetList } from '../constants/sound';
import { useSoundVolumeStore } from '../store/soundVolumeStore';
import { soundList, SoundKey } from '../constants/sound';
import debounce from 'lodash.debounce';

const PRESET_STORAGE_KEY = 'PRESET_LIST';
const SELECTED_PRESET_KEY = 'SELECTED_PRESET';

/**
 * 앱 시작 시 AsyncStorage에 프리셋이 저장되어 있는지 확인하고,
 * 없으면 기본 프리셋을 AsyncStorage와 zustand에 저장,
 * 있으면 AsyncStorage에서 불러와 zustand에 저장
 */
export function useInitPreset() {
  const setPresets = (newPresets: typeof presetList) => {
    usePresetStore.setState({ presets: newPresets });
  };

  useEffect(() => {
    async function checkAndInitPreset() {
      // 프리셋
      const stored = await AsyncStorage.getItem(PRESET_STORAGE_KEY);
      if (!stored) {
        await AsyncStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presetList));
        usePresetStore.setState({ presets: presetList });
      } else {
        usePresetStore.setState({ presets: JSON.parse(stored) });
      }
      // 선택된 프리셋
      const selected = await AsyncStorage.getItem(SELECTED_PRESET_KEY);
      if (!selected) {
        await AsyncStorage.setItem(SELECTED_PRESET_KEY, '0');
        usePresetStore.setState({ selectedPreset: 0 });
      } else {
        usePresetStore.setState({ selectedPreset: Number(selected) });
      }
      usePresetStore.setState({ isPresetLoaded: true });
    }
    checkAndInitPreset();
  }, []);
}

/**
 * 프리셋 스토어와 AsyncStorage를 연동하여 프리셋을 불러오고 저장하는 커스텀 훅
 */
export function usePresetActions() {
  const presets = usePresetStore(state => state.presets);
  const updatePreset = usePresetStore(state => state.updatePreset);
  const selectedPreset = usePresetStore(state => state.selectedPreset);
  const setSelectedPreset = usePresetStore(state => state.setSelectedPreset);
  const setPresets = (newPresets: typeof presets) => {
    usePresetStore.setState({ presets: newPresets });
  };

  // 볼륨 스토어
  const { volumes, setVolume, setRandomVolumes } = useSoundVolumeStore();

  // 프리셋을 AsyncStorage에 저장 (디바운스)
  const debouncedSave = debounce((presetsToSave: typeof presets) => {
    AsyncStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presetsToSave));
  }, 1000);

  // 프리셋이 바뀔 때 볼륨을 zustand에 반영
  useEffect(() => {
    const currentPreset = presets[selectedPreset] || [];
    useSoundVolumeStore.setState({
      volumes: Object.fromEntries(
        soundList.map(sound => [
          sound.key,
          currentPreset.find(p => p.key === sound.key)?.volume ?? 0,
        ])
      ),
    });
  }, [presets, selectedPreset]);

  // 볼륨 변경 시 프리셋 갱신 및 저장
  const setVolumeAndSyncPreset = (soundKey: SoundKey, volume: number) => {
    setVolume(soundKey, volume);
    const newPreset = [...(presets[selectedPreset] || [])].map(item =>
      item.key === soundKey ? { ...item, volume } : item
    );
    updatePreset(selectedPreset, newPreset);
    const newPresets = presets.map((p, i) => (i === selectedPreset ? newPreset : p));
    debouncedSave(newPresets);
  };

  // 랜덤 볼륨 배정 시 프리셋 갱신 및 저장
  const setRandomVolumesAndSyncPreset = () => {
    setRandomVolumes();
    setTimeout(() => {
      const { volumes: newVolumes } = useSoundVolumeStore.getState();
      const newPreset = soundList.map(sound => ({
        key: sound.key,
        volume: newVolumes[sound.key] ?? 0,
      }));
      updatePreset(selectedPreset, newPreset);
      const newPresets = presets.map((p, i) => (i === selectedPreset ? newPreset : p));
      debouncedSave(newPresets);
    }, 0);
  };

  // AsyncStorage에서 프리셋 불러오기
  const loadPresetsFromStorage = async () => {
    const stored = await AsyncStorage.getItem(PRESET_STORAGE_KEY);
    if (stored) {
      setPresets(JSON.parse(stored));
    }
  };

  // 프리셋을 AsyncStorage에 저장
  const savePresetsToStorage = async (presetsToSave: typeof presets) => {
    await AsyncStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presetsToSave));
    setPresets(presetsToSave);
  };

  // 프리셋 추가/수정/삭제 시 저장
  const addPreset = async (preset: typeof presets[number]) => {
    const newPresets = [...presets, preset];
    await savePresetsToStorage(newPresets);
  };

  const updatePresetAt = async (index: number, preset: typeof presets[number]) => {
    const newPresets = presets.map((p, i) => (i === index ? preset : p));
    await savePresetsToStorage(newPresets);
  };

  const deletePresetAt = async (index: number) => {
    const newPresets = presets.filter((_, i) => i !== index);
    await savePresetsToStorage(newPresets);
  };

  return {
    presets,
    selectedPreset,
    setSelectedPreset,
    addPreset,
    updatePresetAt,
    deletePresetAt,
    loadPresetsFromStorage,
    savePresetsToStorage,
    setVolumeAndSyncPreset,
    setRandomVolumesAndSyncPreset,
  };
}
