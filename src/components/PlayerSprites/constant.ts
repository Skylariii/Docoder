export interface Player {
  HP: number;
  ATK: number;
  ES: number;
  POW: number;
  speed: number;
}

export enum Status {
  RUNNING, //跑步
  JUMPING, //跳跃
  SPRINTING, //无敌冲刺
  ATACKING //攻击
}

//蓝妹x轴距离
export const X = 220;
//蓝妹y轴距离
export const Y = 80;
//蓝妹宽高
export const WIDTH = 90;
export const HEIGHT = 150;
