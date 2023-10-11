import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Sprite, useTick } from '@pixi/react';

const BugScrips = forwardRef(function BugScrips(props: any, ref: any) {
  const { X, Y } = props;
  const [blood, setBlood] = useState<number>(1); //血量
  const [attack, setAttack] = useState<number>(1); //攻击力
  const url: string = 'https://pixijs.com/assets/bunny.png'; //默认为小兔子
  const [x, setX] = useState<number>(X || 600); //图片生成x的位置
  const [y, setY] = useState<number>(Y || 150); //图片生成的y的位置
  const [rotation, setRotation] = useState<number>(0); //旋转
  const monsterRef = useRef<any>(null);
  const [random, setRandom] = useState<number>(Math.random());

  useImperativeHandle(ref, () => {
    return {
      changeBlood,
      attacktion
    };
  });

  // 后续改变血量
  const changeBlood: Function = (bloodDecline: number) => {
    setBlood(blood - bloodDecline);
  };

  // 外部调用攻击
  const attacktion: Function = () => attack;

  // 自移动，60帧
  useTick((delta: number) => {
    if (delta) {
      setRotation(rotation + (random * 0.2 + 0.05) * delta);
      if (blood > 0 && y < 270 && y > 130) {
        setX(x - 1);
        setY(y + (random > 0.5 ? 1 : -1));
      } else if (blood > 0) {
        setX(x - 1);
      } else {
        y > 200 ? setY(y + 2) : setY(y - 2);
      }
    }
  });

  return (
    <>
      <Sprite
        interactive={true}
        image={url}
        x={x}
        y={y}
        anchor={{ x: 0.5, y: 0.5 }}
        rotation={rotation}
        ref={monsterRef}
      />
    </>
  );
});

export default BugScrips;
