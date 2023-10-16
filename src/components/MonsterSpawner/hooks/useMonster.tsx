import { useEffect, useRef, useState } from 'react';
import BugScrips from '../../EnemySprites/BugScrips';

export default function useMonster() {
  const [monsters_Bug, setMonsters_Bug] = useState<JSX.Element[]>([]);
  const monsterCountRef = useRef(0);
  const bugRefs = useRef<any>([]); //每个bug的实例h

  const updateMonsters = () => {
    // 生成新的怪物，使用独立的计数器作为唯一的key
    const newMonster: JSX.Element = (
      <BugScrips
        key={monsterCountRef.current}
        X={window.innerWidth + 20}
        Y={200}
        ref={(bugRef: any) => {
          if (bugRef) {
            bugRefs.current.push(bugRef); //动态拿到对应bug的实例
          }
        }}
      />
    );
    setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);

    // 增加计数器
    monsterCountRef.current++;
    if (monsterCountRef.current > 1000) {
      monsterCountRef.current = 0;
    }

    // 概率生成恶意代码
    //    if (Math.random() > 0.7 && !MaliciousScrip) {
    //      setMaliciousScrip(<MaliciousScrips X={600} Y={150} ref={MaliciousScripsRef} />);
    //    }
  };
  useEffect(() => {
    // 创建一个定时器来定期刷新怪物
    const spawnMonsterInterval = setInterval(updateMonsters, 1500);

    return () => {
      // 在组件卸载时清除定时器
      clearInterval(spawnMonsterInterval);
    };
  }, []);

  return { monsters_Bug, bugRefs, setMonsters_Bug };
}
