import { Container } from '@pixi/react';
import { useEffect, useState, useRef } from 'react';
import EnemySprites from '../EnemySprites';
import { hitTestRectangle } from '../../utils';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';

const App = () => {
  const [monsters, setMonsters] = useState<JSX.Element[]>([]);
  const containerRef = useRef<any>(null);
  const monsterCountRef = useRef(0);
  const LanMei = useRef<any>(null);

  const updateMonsters = () => {
    // 生成新的怪物，使用独立的计数器作为唯一的key
    const newMonster = <EnemySprites type={'bug'} key={monsterCountRef.current}></EnemySprites>;
    setMonsters((prevMonsters) => [...prevMonsters, newMonster]);

    // 增加计数器
    monsterCountRef.current++;
    if (monsterCountRef.current > 10000) {
      monsterCountRef.current = 0;
    }
  };

  useEffect(() => {
    // 创建一个定时器来定期刷新怪物
    const spawnMonsterInterval = setInterval(updateMonsters, 1000);

    return () => {
      // 在组件卸载时清除定时器
      clearInterval(spawnMonsterInterval);
    };
  }, []);
  const HitMonitor = () => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      const x = containerRef.current.children[0].x;
      if (x < 200) {
        // 如果被蓝妹躲过，移除第一个精灵
        setMonsters((prevMonsters) => prevMonsters.slice(1));
      }
    }
    // 执行碰撞检测并过滤掉碰撞的怪物
    if (LanMei.current && containerRef.current) {
      const newMonster = monsters.filter((_, index) => {
        return !hitTestRectangle(LanMei.current.ref.current, containerRef.current.children[index]).value;
      });
      if (newMonster.length !== monsters.length) {
        setMonsters(() => newMonster);
      }
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
      <Circle x={120} y={400} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      <Container ref={containerRef}>{monsters}</Container>
      <Circle x={820} y={400} size={60} handleClick={attack} />
    </>
  );
};

export default App;
