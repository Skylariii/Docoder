import { Container } from '@pixi/react';
import { useEffect, useState, useRef } from 'react';
import EnemySprites from '../EnemySprites';
import { hitTestRectangle } from '../../utils';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';

const App = () => {
  const [monsters_Bug, setMonsters_Bug] = useState<JSX.Element[]>([]);
  const containerRef = useRef<any>(null);
  const childrens = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null)
  ];
  const monsterCountRef = useRef(0);
  const LanMei = useRef<any>(null);
  const MaliciousScrips = useRef<any>(null); //恶意代码

  const updateBugs = async () => {
    for (let i = 0; i < Math.random() * 6; i++) {
      setTimeout(() => {
        const newMonster = <EnemySprites type={'bug'} key={monsterCountRef.current}></EnemySprites>;
        setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);
        // 增加计数器
        monsterCountRef.current++;
        if (monsterCountRef.current > 10000) {
          monsterCountRef.current = 0;
        }
      }, i * 500);
    }
  };
  const updateBigs = () => {
    // 随机选择生成小怪或大怪
    const isBug = Math.random() < 0.95;
    if (!isBug) {
      // 生成新的怪物，使用独立的计数器作为唯一的 key
      const newMonster = <EnemySprites type={'maliciousScrips'} key={monsterCountRef.current}></EnemySprites>;

      setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);

      // 增加计数器
      monsterCountRef.current++;
      if (monsterCountRef.current > 10000) {
        monsterCountRef.current = 0;
      }
    }
  };

  useEffect(() => {
    // 创建一个定时器来定期刷新怪物
    const spawnBugMonsterInterval = setInterval(updateBugs, 6000);
    const spawnBigMonsterInterval = setInterval(updateBigs, 5000);

    return () => {
      // 在组件卸载时清除定时器
      clearInterval(spawnBugMonsterInterval);
      clearInterval(spawnBigMonsterInterval);
    };
  }, []);
  const HitMonitor = () => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      const x = containerRef.current.children[0].x;
      const y = containerRef.current.children[0].y;
      if (x < 200) {
        childrens[monsterCountRef.current % 6].current.changeBlood(1);
        // 如果被蓝妹躲过，移除第一个精灵

        if (y > 400) {
          // setMonsters_Bug((prevMonsters) => prevMonsters.slice(1));
          MaliciousScrips.current.changeBlood(1); //每移除一个精灵，恶意代码血量减一
        }
      }
    }
    // 执行碰撞检测并过滤掉碰撞的怪物
    if (LanMei.current && containerRef.current) {
      const newMonster = monsters_Bug.filter((_, index) => {
        return !hitTestRectangle(LanMei.current.ref.current, containerRef.current.children[index]).value;
      });
      if (newMonster.length !== monsters_Bug.length) {
        setMonsters_Bug(() => newMonster);
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
      <Circle x={70} y={310} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      <Container ref={containerRef}>{monsters_Bug}</Container>
      <Circle x={780} y={310} size={60} handleClick={attack} />
    </>
  );
};

export default App;
