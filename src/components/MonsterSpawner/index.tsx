import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonsters from './hooks/useMonstersBug.tsx';
import useLanMei from './hooks/useLanMei.tsx';
import { useEffect, useRef } from 'react';
import useMaliciousScrips from './hooks/useMaliciousScrips.tsx';
const App = () => {
  const monsterCountRef = useRef(0); // 提供唯一的key
  const { LanMei, jump, attack } = useLanMei();
  const { monsters_Bug, start } = useMonsters(LanMei, monsterCountRef);
  const { MaliciousScrip, Minimonsters_Bugs } = useMaliciousScrips(LanMei, monsterCountRef);
  useEffect(() => {
    start.current = true;
  }, []);

  return (
    <>
      <Circle x={window.innerWidth * 0.1} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      {monsters_Bug.map(({ monster }) => monster)}
      <Circle x={window.innerWidth * 0.9} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {MaliciousScrip}
      {Minimonsters_Bugs.map(({ monster }) => {
        return monster;
      })}
    </>
  );
};

export default App;
