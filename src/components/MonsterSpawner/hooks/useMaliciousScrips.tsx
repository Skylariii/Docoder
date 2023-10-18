import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../../contexts';
import MaliciousScrips from '../../EnemySprites/MaliciousScrips';
import { Ticks } from './useTicks.tsx';
import useMonstersBug from './useMonstersBug.tsx';

export default function useMaliciousScrips(
  LanMei: React.MutableRefObject<any>,
  generateTick: React.MutableRefObject<Ticks>,
  deleteTick: React.MutableRefObject<Ticks>
) {
  const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element | undefined>(undefined); //恶意代码
  const generateTimeRef = useRef(0);
  const { score } = useStore();
  const { monsters_Bug, setStart, setPositionConfig } = useMonstersBug(LanMei, generateTick, deleteTick);
  const generate = function () {
    if (MaliciousScripsRef) {
      setStart(true);
    }
    if (!MaliciousScrip) {
      const newMaliciousScrips = (
        <MaliciousScrips X={window.innerWidth + 10} Y={-10} ref={MaliciousScripsRef}></MaliciousScrips>
      );
      setMaliciousScrip((item) => newMaliciousScrips);
    }
  };
  useEffect(() => {
    generateTick.current['generateMalicious'] = {
      timeRef: generateTimeRef,
      timeOut: 300,
      callBack: generate
    };
    if (!MaliciousScrip) {
      delete generateTick.current['generateMalicious'];
    }
  }, [MaliciousScrip]);
  return { MaliciousScripsRef, MaliciousScrip, setMaliciousScrip };
}
