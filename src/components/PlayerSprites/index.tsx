import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Texture } from 'pixi.js';
import { AnimatedSprite } from '@pixi/react';
import { Status, X, Y, WIDTH, HEIGHT } from './constant';
//images
import run000Img from '../../assets/run/Run_000.png';
import run001Img from '../../assets/run/Run_001.png';
import run002Img from '../../assets/run/Run_002.png';
import run003Img from '../../assets/run/Run_003.png';
import run004Img from '../../assets/run/Run_004.png';
import run005Img from '../../assets/run/Run_005.png';
import run006Img from '../../assets/run/Run_006.png';
import run007Img from '../../assets/run/Run_007.png';
import run008Img from '../../assets/run/Run_008.png';
import run009Img from '../../assets/run/Run_009.png';
//hooks
import useJump from './hooks/useJump';

const PlayerSprites = forwardRef((_props, ref) => {
  const animationSprite = useRef(null);
  const [HP, setHP] = useState(1); //生命值
  const [ATK, setATK] = useState(1); //攻击力
  const [ES, setES] = useState(1); //护盾值
  const [POW, setPOW] = useState(0); //能量条
  const [status, setStatus] = useState<Status>(Status.RUNNING); //当前状态
  const [h, setH] = useState(Y); //高度
  const [v, setV] = useState(5); //速度
  const [frames, setFrames] = useState([]); //动画分解图
  const alienImages = ['https://pixijs.io/pixi-react/img/bunny.png'];
  const textureArray = [];
  const { jump } = useJump({ h, v, setH, setV });

  useImperativeHandle(ref, () => {
    return {
      HP,
      jump,
      attack,
      ref
    };
  });

  useEffect(() => {
    getRunningImgs();
  }, []);

  //监听人物状态
  useEffect(() => {
    switch (status) {
      case Status.RUNNING:
        getRunningImgs();
        setTimeout(() => {
          animationSprite.current.play();
        });
        break;
      case Status.ATACKING:
        getAnimateImgs([run000Img, run005Img]);
        setTimeout(() => {
          animationSprite.current.play();
        });
        setTimeout(() => {
          setStatus(Status.RUNNING);
        }, 100);
        break;
      default:
        break;
    }
  }, [status]);

  for (let i = 0; i < alienImages.length; i++) {
    const texture = Texture.from(alienImages[i]);
    textureArray.push(texture);
  }

  if (frames.length === 0) {
    return null;
  }

  //攻击
  function attack() {
    setStatus(Status.ATACKING);
  }

  //获得跑步动画
  function getRunningImgs() {
    const runImgs = [
      run000Img,
      run001Img,
      run002Img,
      run003Img,
      run004Img,
      run005Img,
      run006Img,
      run007Img,
      run008Img,
      run009Img
    ];
    getAnimateImgs(runImgs);
  }

  //获得动画图片数组
  function getAnimateImgs(imgs: Array<string>) {
    setFrames(
      imgs.map((img) => {
        return Texture.from(img);
      })
    );
  }

  return (
    <AnimatedSprite
      ref={animationSprite}
      // ref={ref}
      animationSpeed={0.22}
      isPlaying={true}
      textures={frames}
      interactive={true}
      width={WIDTH}
      height={HEIGHT}
      x={X}
      y={h}
      anchor={{ x: 0.5 }}
    />
  );
});

export default PlayerSprites;
