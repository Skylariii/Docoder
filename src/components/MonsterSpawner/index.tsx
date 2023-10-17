import { useRef } from 'react';
import PlayerSprites from '../PlayerSprites';
import Circle from '../Circle';
import useMonsters from './hooks/useMonsters.tsx';
const App = () => {
  const LanMei = useRef<any>(null);
  // const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  // const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element>(); //恶意代码
  const { monsters_Bug } = useMonsters(LanMei);
  function jump() {
    if (LanMei.current) LanMei.current.jump();
  }
  function attack() {
    if (LanMei.current) LanMei.current.attack();
  }
  return (
    <>
      <Circle x={window.innerWidth * 0.1} y={window.innerHeight * 0.8} size={60} handleClick={jump} />
      <PlayerSprites ref={LanMei}></PlayerSprites>
      {monsters_Bug.map((item) => {
        return item.monster;
      })}
      <Circle x={window.innerWidth * 0.9} y={window.innerHeight * 0.8} size={60} handleClick={attack} />
      {/* <MaliciousScrips X={600} Y={150} ref={MaliciousScripsRef} /> */}
      {/*{MaliciousScrip}*/}
    </>
  );
};

export default App;
