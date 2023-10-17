import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Sprite, useTick } from '@pixi/react';

const MaliciousScrips = forwardRef(function MaliciousScrips(props: any, ref: any) {
  const { X, Y } = props;
  const [blood, setBlood] = useState<number>(10); //血量
  const [attack, setAttack] = useState<number>(2); //攻击力
  const url: string = 'https://pixijs.com/assets/eggHead.png'; //默认为小兔子
  const [x, setX] = useState<number>(window.innerWidth + 20); //图片生成x的位置
  const [y, setY] = useState<number>(-20); //图片生成的y的位置
  const [up_down, setUp_Down] = useState<string>('initialization'); //图片上移还是下移、初始化
  const [rotation, setRotation] = useState<number>(0); //旋转
  const monsterRef = useRef<any>(null);

  useImperativeHandle(ref, () => {
    return {
      changeBlood,
      attacktion,
      blood,
      x,
      ref: monsterRef
    };
  });

  // 后续改变血量
  const changeBlood: Function = (bloodDecline: number) => {
    setBlood(blood - bloodDecline);
  };

  // 外部调用攻击
  const attacktion: Function = () => {
    console.log('你扣了' + attack + '点血');
    return attack;
  };

  // 自移动，60帧
  useTick((delta: number) => {
    if (delta) {
      setRotation(rotation + 0.1 * delta);
      if (blood > 0) {
        if (up_down === 'initialization') {
          if (x != X) {
            setX(x - 1);
          }
          if (y != Y) {
            setY(y + 1);
          }
          if (x === X && y === Y) {
            setUp_Down('down');
          }
        } else {
          if (up_down === 'down' && y >= 140 && x > 250) {
            //左移且上下移动
            setY(y - 1);
          } else if (up_down === 'down' && y >= 140) {
            //仅上下移动
            setY(y - 1);
          } else if (up_down === 'down') {
            setUp_Down('up');
          }
          if (up_down === 'up' && y <= 160 && x > 250) {
            setY(y + 1);
          } else if (up_down === 'up' && y <= 160) {
            setY(y + 1);
          } else if (up_down === 'up') {
            setUp_Down('down');
          }
        }
      } else {
        setY(y - 1);
        setX(x + 1);
      }
    }
  });

  return (
    <>
      <Sprite interactive={true} image={url} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} ref={monsterRef} />
    </>
  );
});
export default MaliciousScrips;
