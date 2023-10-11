export interface Player {
  HP: number;
  ATK: number;
  ES: number;
  POW: number;
  speed: number;
}

export enum Status {
  RUNNING,
  JUMPING,
  SPRINTING,
  ATACKING,
  INVINCIBLE
}
