export const soundList = [
  { key: "rain1", label: "비1", fileName: "rain1", defaultVolume: 0.3 },
  { key: "rain2", label: "비2", fileName: "rain2", defaultVolume: 0 },
  { key: "frog1", label: "개구리", fileName: "frog1", defaultVolume: 0 },
  { key: "wind1", label: "바람", fileName: "wind1", defaultVolume: 0 },
  { key: "river1", label: "강물", fileName: "river1", defaultVolume: 0 },
  { key: "fire1", label: "모닥불", fileName: "fire1", defaultVolume: 0 },
  { key: "bird1", label: "새", fileName: "bird1", defaultVolume: 0 },
  { key: "crickets1", label: "귀뚜라미", fileName: "crickets1", defaultVolume: 0 },
] as const;

export type SoundKey = typeof soundList[number]["key"];
