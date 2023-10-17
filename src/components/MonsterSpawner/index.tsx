import { useRef } from 'react';
import { hitTestRectangle } from '../../utils';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonsters from './hooks/useMonsters.tsx';
import { useTick } from '@pixi/react';
const App = () => {
  const LanMei = useRef<any>(null);
  // const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  // const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element>(); //恶意代码
  const { monsters_Bug, setMonsters_Bug } = useMonsters();
  const Timecount = useRef(0);
  const HitMonitor = () => {
    const already = monsters_Bug.length > 0;
    if (LanMei.current && !already) return;
    const newMonsters = monsters_Bug.filter((item: any) => {
      const X = item.monsterRef.ref.current.x; // 获得当前的坐标
      const Y = item.monsterRef.ref.current.y;
      if (item.monsterRef) return !(X < -20 || Y < -20 || Y > window.innerHeight + 20); // 对于超出屏幕的精灵删除
      return true;
    });
    //     if (MaliciousScrip && MaliciousScrip != <></>) MaliciousScripsRef.current.changeBlood(1); //每移除一个精灵，恶意代码血量减一

    // 如果被蓝妹躲过，移除第一个精灵
    // setMonsters_Bug((prevMonsters) => prevMonsters.slice(1));

    // 执行碰撞检测并过滤掉碰撞的怪物
    newMonsters.forEach((item: any) => {
      if (item.monsterRef && hitTestRectangle(LanMei.current.ref.current, item.monsterRef.ref.current).value) {
        item.monsterRef.changeBlood(1);
      }
    });

    setMonsters_Bug(newMonsters);
    //     if (
    //       MaliciousScrip != undefined &&
    //       MaliciousScripsRef.current.blood <= 0 &&
    //       MaliciousScripsRef.current.x >= window.innerWidth + 10
    //     ) {
    //       setMaliciousScrip(<></>);
    //     }
  };
  useTick((delta) => {
    Timecount.current += delta;
    if (Timecount.current > 10) {
      HitMonitor();
      Timecount.current = 0;
    }
  });
  function jump() {
    if (LanMei.current) LanMei.current.jump();
  }
  function attack() {
    if (LanMei.current) LanMei.current.attack();
  }
  return (
    <>
      <Circle x={window.innerWidth * 0.1} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      {monsters_Bug.map((item) => {
        return item.monster;
      })}
      <Circle x={window.innerWidth * 0.9} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {/* <MaliciousScrips X={600} Y={150} ref={MaliciousScripsRef} /> */}
      {/*{MaliciousScrip}*/}
    </>
  );
};

export default App;
