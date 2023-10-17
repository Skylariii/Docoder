import { useTick } from '@pixi/react';
import { useRef, useState } from 'react';
import generateMonster, { Monster } from '../utils/generateMonster';
import hitTestRectangle from '../../../utils/hitTestRectangle';

export default (LanMei: React.MutableRefObject<any>) => {
  const [monsters_Bug, setMonsters_Bug] = useState<Monster[]>([]);
  const monsterCountRef = useRef(0);
  const generateElapsed = useRef<number>(0);
  const deletElapsed = useRef<number>(0);
  const genrate = function () {
    monsterCountRef.current++;
    const newMonster = generateMonster(monsterCountRef.current);

    setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);
    if (monsterCountRef.current > 1000) {
      monsterCountRef.current = 0;
    }
  };

  const deleteMonster = function (LanMei: React.MutableRefObject<any>) {
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
    generateElapsed.current += delta;
    deletElapsed.current += delta;
    if (generateElapsed.current > 90) {
      generateElapsed.current = 0;
      genrate();
      //      if (Math.random() > 0.7 && !MaliciousScript) {
      //        const maliciousScript = <MaliciousScripts X={600} Y={150} ref={MaliciousScriptsRef} />;
      //        setMaliciousScript(maliciousScript);
      //      }
    }
    if (deletElapsed.current > 10) {
      deleteMonster(LanMei);
      deletElapsed.current = 0;
    }
  });
  return { monsters_Bug, setMonsters_Bug, monsterCountRef };
};
