import { Container } from '@pixi/react';
import { useEffect, useState, useRef } from 'react';
import { hitTestRectangle } from '../../utils';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonster from './hooks/useMonster.tsx';

const App = () => {
  const LanMei = useRef<any>(null);
  const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element>(); //恶意代码
  const { monsters_Bug, bugRefs, setMonsters_Bug } = useMonster();
  const HitMonitor = () => {
    const already = bugRefs.current.length > 0; //检测是否已经刷怪
    if (already) {
      // 获取第一个怪物
      const firstMonster = bugRefs.current[0];
      if (firstMonster.X < 200) {
        firstMonster.attacktion(); //怪物攻击
        firstMonster.changeBlood(1); //怪物扣一点血
      }

      if (MaliciousScrip && MaliciousScrip != <></>) MaliciousScripsRef.current.changeBlood(1); //每移除一个精灵，恶意代码血量减一

      // 如果被蓝妹躲过，移除第一个精灵
      // setMonsters_Bug((prevMonsters) => prevMonsters.slice(1));
    }
    // 执行碰撞检测并过滤掉碰撞的怪物
    if (LanMei.current && already) {
      const newMonster = monsters_Bug.filter((_, index: number) => {
        const unhited = !hitTestRectangle(LanMei.current.ref.current, bugRefs.current[index].ref.current).value;
        if (!unhited) bugRefs.current.splice(index, 1);
        return unhited;
      });
      if (newMonster.length !== monsters_Bug.length) {
        setMonsters_Bug(() => newMonster);
      }
    }
    if (
      MaliciousScrip != undefined &&
      MaliciousScripsRef.current.blood <= 0 &&
      MaliciousScripsRef.current.x >= window.innerWidth + 10
    ) {
      setMaliciousScrip(<></>);
    }
  };
  useEffect(() => {
    const Interval = setInterval(() => {
      HitMonitor();
    }, 100);

    return () => {
      clearInterval(Interval);
    };
  });
  function jump() {
    if (LanMei.current) LanMei.current.jump();
  }
  function attack() {
    if (LanMei.current) LanMei.current.attack();
  }
  return (
    <>
      <Circle x={window.innerWidth * 0.2} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      <Container>{monsters_Bug}</Container>
      <Circle x={window.innerWidth * 0.8} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {/* <MaliciousScrips X={600} Y={150} ref={MaliciousScripsRef} /> */}
      {MaliciousScrip}
    </>
  );
};

export default App;
