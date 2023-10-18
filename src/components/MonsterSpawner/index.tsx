import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonsters from './hooks/useMonstersBug.tsx';
import useLanMei from './hooks/useLanMei.tsx';
import { useEffect } from 'react';
const App = () => {
  const { LanMei, jump, attack } = useLanMei();
  const { monsters_Bug, setStart } = useMonsters(LanMei);
  // const { MaliciousScrip } = useMaliciousScrips(LanMei);
  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <>
      <Circle x={window.innerWidth * 0.1} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      {monsters_Bug.map(({ monster }) => monster)}
      <Circle x={window.innerWidth * 0.9} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {/*{MaliciousScrip}*/}
    </>
  );
};

export default App;
