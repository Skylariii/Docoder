import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Sprite, useTick } from '@pixi/react';
import BugScrips from '../BugScrips';

const MaliciousScrips = forwardRef(function MaliciousScrips(props: any, ref: any) {
  const { X, Y } = props;
  const [maliciousScrips_Bug, setMaliciousScrips_Bug] = useState<JSX.Element[]>([]); //恶意代码的子bug
  const containerRef = useRef<any>(null);
  const monsterCountRef = useRef(0);
  const bugRef = useRef(0);
  const bugRefs = useRef<any>(new Array()); //每个bug的实例
  const [blood, setBlood] = useState<number>(5); //血量
  const [attack, setAttack] = useState<number>(2); //攻击力
  const url = 'https://pixijs.com/assets/eggHead.png'; //默认为小兔子
  const [x, setX] = useState<number>(X); //图片生成x的位置
  const [y, setY] = useState<number>(Y); //图片生成的y的位置
  const [up_down, setUp_Down] = useState<string>('down'); //图片上移还是下移
  const [rotation, setRotation] = useState<number>(0); //旋转
  const monsterRef = useRef<any>(null);
  const [myInterval, setMyInterval] = useState<any>();

  useImperativeHandle(ref, () => {
    return {
      changeBlood,
      blood
    };
  });

  // 后续改变血量
  const changeBlood = (bloodDecline: number) => {
    setBlood(blood - bloodDecline);
  };

  // 自移动，60帧
  useTick((delta) => {
    if (delta) {
      setRotation(rotation + 0.1 * delta);
      if (blood > 0) {
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
      } else {
        setY(y - 1);
        setX(x + 1);
      }
    }
  });

  const updateMonsters = () => {
    // 生成新的怪物，使用独立的计数器作为唯一的key
    const newMonster = (
      <BugScrips
        key={monsterCountRef.current}
        x={X}
        y={Y}
        ref={(bugRef) => {
          if (bugRef) bugRefs.current[monsterCountRef.current] = bugRef; //动态拿到对应bug的实例
        }}
      />
    );

    // console.log(bugRefs.current[2]);

    setMaliciousScrips_Bug((prevMonsters) => [...prevMonsters, newMonster]);

    // 增加计数器
    monsterCountRef.current++;
    if (monsterCountRef.current > 10000) {
      monsterCountRef.current = 0;
    }
  };

  useEffect(() => {
    // 创建一个定时器来定期刷新怪物

    if (!myInterval) {
      setMyInterval(setInterval(updateMonsters, 1000));
    }
    // 在血量低时清除定时器
    if (blood <= 0) {
      clearInterval(myInterval);
    }
  }, [blood]);

  return (
    <>
      <Sprite interactive={true} image={url} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} ref={monsterRef} />
      <Container ref={containerRef}>{maliciousScrips_Bug}</Container>
    </>
  );
});

export default MaliciousScrips;