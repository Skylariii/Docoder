import { Container } from '@pixi/react';
import { useEffect, useState, useRef } from 'react';
import EnemySprites from '../EnemySprites';
import { hitTestRectangle } from '../../utils';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';

const App = () => {
  const [monsters_Bug, setMonsters_Bug] = useState<JSX.Element[]>([]);
  const containerRef = useRef<any>(null);
  const bugRef = useRef(0);
  const bugRefs = useRef<any>(new Array()); //每个bug的实例
  const monsterCountRef = useRef(0);
  const LanMei = useRef<any>(null);
  const MaliciousScrips = useRef<any>(null); //恶意代码

  const updateMonsters = () => {
    // 生成新的怪物，使用独立的计数器作为唯一的key
    const newMonster = (
      <EnemySprites
        type={'bug'}
        key={monsterCountRef.current}
        X={600}
        Y={270}
        ref={(bugRef) => {
          if (bugRef) bugRefs.current[monsterCountRef.current] = bugRef; //动态拿到对应bug的实例
        }}
      ></EnemySprites>
    );
    // bugRefs.current.push(bugRef);
    setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);

    // 增加计数器
    monsterCountRef.current++;
    if (monsterCountRef.current > 1000) {
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
      // 获取第一个怪物的x值
      const x = containerRef.current.children[bugRef.current].x;

      if (x < 200) {
        bugRef.current++;
        bugRefs.current[bugRef.current].changeBlood(1); //怪物扣一点血
        MaliciousScrips.current.changeBlood(1); //每移除一个精灵，恶意代码血量减一

        // 如果被蓝妹躲过，移除第一个精灵
        // setMonsters_Bug((prevMonsters) => prevMonsters.slice(1));
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
      <Circle x={100} y={320} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      <Container ref={containerRef}>{monsters_Bug}</Container>
      <Circle x={750} y={320} size={60} handleClick={attack} />
      <EnemySprites type="maliciousScrips" X={600} Y={270} ref={MaliciousScrips} />
    </>
  );
};

export default App;
