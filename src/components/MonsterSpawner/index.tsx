import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonsters from './hooks/useMonstersBug.tsx';
import useLanMei from './hooks/useLanMei.tsx';
import useTicks from './hooks/useTicks.tsx';
import useMaliciousScrips from './hooks/useMaliciousScrips.tsx';
const App = () => {
  const { LanMei, jump, attack } = useLanMei();
  const Ticks = useTicks();
  const { monsters_Bug } = useMonsters(LanMei, Ticks);
  const { MaliciousScrip } = useMaliciousScrips(Ticks);

  return (
    <>
      <Circle x={window.innerWidth * 0.1} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      {monsters_Bug.map(({ monster }) => monster)}
      <Circle x={window.innerWidth * 0.9} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {MaliciousScrip}
    </>
  );
};

export default App;
