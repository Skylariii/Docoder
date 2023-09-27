import { LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Graphics, Sprite, Stage, Text, useTick } from '@pixi/react';

export default function EnemySprites(props: any) {
  const { type } = props;
  const [blood, setBlood] = useState(0); //血量
  const [attack, setAttack] = useState(0); //攻击力
  const [url, setUrl] = useState('https://pixijs.com/assets/bunny.png'); //默认为小兔子
  const [x, setX] = useState(600); //图片生成x的位置
  const [y, setY] = useState(type === 'bug' ? 270 : 150); //图片生成的y的位置
  const [up_down, setUp_Down] = useState('down'); //图片上移还是下移
  const [rotation, setRotation] = useState(0); //旋转

  // 初始化血量以及攻击力
  useEffect(() => {
    //   判断需要那个类型的敌人
    if (type) {
      if (type === 'bug') {
        setBlood(1);
        setAttack(1);
        setUrl('https://pixijs.com/assets/bunny.png');
      } else if (type === 'maliciousScrips') {
        setBlood(5);
        setAttack(2);
        setUrl('https://pixijs.com/assets/eggHead.png');
      }
    }
  }, []);
  // 后续改变血量
  useEffect(() => {}, [blood]);

  useTick((delta) => {
    if (delta) {
      setRotation(rotation + 0.1 * delta);
      if (type === 'bug' && x >= 15) {
        setX(x - 1);
      } else {
        if (up_down === 'down' && y >= 140 && x > 250) {
          //左移且上下移动
          setY(y - 1);
          setX(x - 1);
        } else if (up_down === 'down' && y >= 140) {
          //仅上下移动
          setY(y - 1);
        } else if (up_down === 'down') {
          setUp_Down('up');
        }
        if (up_down === 'up' && y <= 160 && x > 250) {
          setY(y + 1);
          setX(x - 1);
        } else if (up_down === 'up' && y <= 160) {
          setY(y + 1);
        } else if (up_down === 'up') {
          setUp_Down('down');
        }
      }
    }
  });

  return (
    <>
      {type === 'bug' ? (
        <Sprite interactive={true} image={url} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} rotation={rotation} />
      ) : (
        <Sprite interactive={true} image={url} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} />
      )}
    </>
  );
}
