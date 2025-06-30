import { create } from 'zustand';
import { useSoundVolumeStore } from './soundVolumeStore';

interface TimerModalState {
  isOpen: boolean;
  minutes: number; // 0~360
  remainingSeconds: number; // 남은 시간(초)
  timerRunning: boolean;
  open: () => void;
  close: () => void;
  setMinutes: (minutes: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

let timerInterval: NodeJS.Timeout | null = null;

export const useTimerModalStore = create<TimerModalState>((set, get) => ({
  isOpen: false,
  minutes: 0,
  remainingSeconds: 0,
  timerRunning: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setMinutes: (minutes) => {
    set({ minutes, remainingSeconds: minutes * 60 });
  },
  startTimer: () => {
    if (timerInterval) clearInterval(timerInterval);
    set((state) => {
      if (state.minutes <= 0) return { timerRunning: false };
      return { remainingSeconds: state.minutes * 60, timerRunning: true };
    });
    timerInterval = setInterval(() => {
      set((state) => {
        if (!state.timerRunning) return state;
        if (state.remainingSeconds <= 1) {
          // 타이머 종료: 일시정지
          useSoundVolumeStore.getState().pause();
          clearInterval(timerInterval!);
          return { remainingSeconds: 0, timerRunning: false };
        }
        return { remainingSeconds: state.remainingSeconds - 1 };
      });
    }, 1000);
  },
  stopTimer: () => {
    if (timerInterval) clearInterval(timerInterval);
    set({ timerRunning: false });
  },
  resetTimer: () => {
    if (timerInterval) clearInterval(timerInterval);
    set((state) => ({ remainingSeconds: state.minutes * 60, timerRunning: false }));
  },
})); 