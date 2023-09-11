import { create } from 'zustand';

const useStore = create<Store>((set) => ({
  isPlay: false, // 是否开始游戏
  isEnd: false, // 是否结束游戏
  score: 0, // 分数
  speed: 1, // 速度
  setIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),
  setIsEnd: () => set((state) => ({ isEnd: !state.isEnd })),
  setScore: (score: number) => set((state) => ({ score: state.score + score })),
  setSpeed: (speed: number) => set(() => ({ speed: speed }))
}));
export default useStore;

export interface Store {
  isPlay: boolean;
  isEnd: boolean;
  score: number;
  speed: number;
  setIsPlay: () => void;
  setIsEnd: () => void;
  setScore: (score: number) => void;
  setSpeed: (speed: number) => void;
}
