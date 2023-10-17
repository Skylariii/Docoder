import { useEffect, useRef, useState } from 'react';
import generateMonster, { Monster } from '../utils/generateMonster';
import hitTestRectangle from '../../../utils/hitTestRectangle';
import useStore from '../../../contexts';
import { Tick } from './useTicks.tsx';

export default function useMonstersBug(LanMei: React.MutableRefObject<any>, Ticks: React.MutableRefObject<Tick[]>) {
  const [monsters_Bug, setMonsters_Bug] = useState<Monster[]>([]); //普通bug,及其ref 数组
  const monsterCountRef = useRef(0); // 提供唯一的key
  const generateElapsed = useRef<number>(0); //生成bugs 计数器
  const disappearElapsed = useRef<number>(0); // 删除bugs 计数器（检测是否超出屏幕）
  const { setScore } = useStore();

  const generate = function () {
    monsterCountRef.current++;
    console.log(monsterCountRef.current);
    console.log(monsters_Bug);
    const newMonster = generateMonster(monsterCountRef.current);
    setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);
    if (monsterCountRef.current > 10000) {
      monsterCountRef.current = 0;
    }
  };
  // const disappear = function (LanMei: React.MutableRefObject<any>) {
  //   if (!LanMei.current) return;
  //   const newMonsters = monsters_Bug.filter(({ monsterRef }: any) => {
  //     if (monsterRef === null) return true;
  //     const X = monsterRef.ref.current.x; // 获得当前的坐标
  //     const Y = monsterRef.ref.current.y;
  //     if (X < -20 || Y < -20 || Y > window.innerHeight + 20) {
  //       if (Y < -20 || Y > window.innerHeight + 20) {
  //         setScore(1);
  //       }
  //       return false;
  //     } // 对于超出屏幕的精灵删除
  //     return true;
  //   });
  //   //     if (MaliciousScrip && MaliciousScrip != <></>) MaliciousScripsRef.current.changeBlood(1); //每移除一个精灵，恶意代码血量减一
  //
  //   // 执行碰撞检测并过滤掉碰撞的怪物
  //
  //   newMonsters.forEach((item: any) => {
  //     if (
  //       item.monsterRef &&
  //       hitTestRectangle(LanMei.current.ref.current, item.monsterRef.ref.current).value &&
  //       LanMei.current
  //     ) {
  //       console.log(123);
  //       item.monsterRef.changeBlood(1); //触发退场动画
  //     }
  //   });
  //
  //   setMonsters_Bug(newMonsters);
  //   //     if (
  //   //       MaliciousScrip != undefined &&
  //   //       MaliciousScripsRef.current.blood <= 0 &&
  //   //       MaliciousScripsRef.current.x >= window.innerWidth + 10
  //   //     ) {
  //   //       setMaliciousScrip(<></>);
  //   //     }
  // };
  useEffect(() => {
    Ticks.current.push({
      timeOut: 90,
      callBack: generate,
      timeRef: generateElapsed
    });
    // Ticks.current.push({
    //   timeOut: 10,
    //   callBack: disappear,
    //   timeRef: disappearElapsed,
    //   parameter: [LanMei]
    // });
  }, []);

  return { monsters_Bug, setMonsters_Bug, monsterCountRef };
}
