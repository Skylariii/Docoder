import { useTick } from '@pixi/react';
import { useRef, useState } from 'react';
import generateMonster, { Monster } from '../utils/generateMonster';

export default () => {
  const [monsters_Bug, setMonsters_Bug] = useState<Monster[]>([]);
  const monsterCountRef = useRef(0);
  const elapsed = useRef<number>(0);
  //   调用 useUpdateMonsters 的逻辑
  useTick((delta) => {
    elapsed.current += delta;
    if (elapsed.current > 90) {
      elapsed.current = 0;
      monsterCountRef.current++;
      const newMonster = generateMonster(monsterCountRef.current);

      setMonsters_Bug((prevMonsters) => [...prevMonsters, newMonster]);
      if (monsterCountRef.current > 1000) {
        monsterCountRef.current = 0;
      }

      //      if (Math.random() > 0.7 && !MaliciousScript) {
      //        const maliciousScript = <MaliciousScripts X={600} Y={150} ref={MaliciousScriptsRef} />;
      //        setMaliciousScript(maliciousScript);
      //      }
    }
  });
  return { monsters_Bug, setMonsters_Bug, monsterCountRef };
};
