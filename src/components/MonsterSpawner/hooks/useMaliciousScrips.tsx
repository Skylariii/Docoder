import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../../contexts';
import MaliciousScrips from '../../EnemySprites/MaliciousScrips';
import useMonstersBug from './useMonstersBug.tsx';
import useTicks from './useTicks.tsx';
import { Container } from '@pixi/react';

export default function useMaliciousScrips(
  LanMei: React.MutableRefObject<any>,
  monsterCountRef: React.MutableRefObject<number>
) {
  const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element | undefined>(undefined); //恶意代码
  const generateTimeRef = useRef(0);
  const { score, setScore } = useStore();
  const { monsters_Bug, start } = useMonstersBug(LanMei, monsterCountRef, changeBloodCallBack);
  const startMalicious = useRef(true);
  const generate = function () {
    if (!MaliciousScrip && score > 100 && Math.random() > 0.2) {
      const newMaliciousScrips = (
        <Container>
          <MaliciousScrips X={window.innerWidth + 20} Y={-20} ref={MaliciousScripsRef}></MaliciousScrips>
        </Container>
      );
      setMaliciousScrip(newMaliciousScrips);
    }
  };
  useEffect(() => {
    if (MaliciousScrip) {
      start.current = true;
    }
  }, [MaliciousScrip]);
  function changeBloodCallBack() {
    MaliciousScripsRef.current.changeBlood(1);
    if (MaliciousScripsRef.current.ref.current.y < 0) {
      setMaliciousScrip(undefined);
      start.current = false;
      setScore(5);
    }
  }

  useTicks({
    timeRef: generateTimeRef,
    timeOut: 300,
    callBack: generate,
    start: startMalicious
  });

  return { MaliciousScripsRef, MaliciousScrip, setMaliciousScrip, Minimonsters_Bugs: monsters_Bug };
}
