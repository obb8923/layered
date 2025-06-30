export const soundList = [
  { key: "rain1", label: "비1", fileName: "rain1" },
  { key: "rain2", label: "비2", fileName: "rain2" },
  { key: "frog1", label: "개구리", fileName: "frog1" },
  { key: "wind1", label: "바람", fileName: "wind1" },
  { key: "river1", label: "강물", fileName: "river1"},
  { key: "fire1", label: "모닥불", fileName: "fire1" },
  { key: "bird1", label: "새", fileName: "bird1"},
  { key: "crickets1", label: "귀뚜라미", fileName: "crickets1" },
] as const;
export type SoundKey = typeof soundList[number]["key"];

export const presetList = [
  [{ key: "rain1",  volume: 0.24 },
    { key: "rain2", volume: 0.76 },
    { key: "frog1",  volume: 0 },
    { key: "wind1", volume: 0 },
    { key: "river1",  volume: 0 },
    { key: "fire1",  volume: 0.28 },
    { key: "bird1",  volume: 0 },
    { key: "crickets1", volume: 0 }],
    [{ key: "rain1",  volume: 0.33 },
      { key: "rain2", volume: 1 },
      { key: "frog1",  volume: 0 },
      { key: "wind1", volume: 0.41 },
      { key: "river1",  volume: 0.03 },
      { key: "fire1",  volume: 0 },
      { key: "bird1",  volume: 0 },
      { key: "crickets1", volume: 0 }]
    
]