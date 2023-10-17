import { useEffect, useRef, useState } from 'react';
import useStore from '../../../contexts';
import MaliciousScrips from '../../EnemySprites/MaliciousScrips';
import { Tick } from './useTicks.tsx';

export default function useMaliciousScrips(Ticks: React.MutableRefObject<Tick[]>) {
  const MaliciousScripsRef = useRef<any>(null); //恶意代码Ref
  const [MaliciousScrip, setMaliciousScrip] = useState<JSX.Element | undefined>(undefined); //恶意代码
  const generateTimeRef = useRef(0);
  const { score } = useStore();
  const generate = function () {
    if (score > 100 && Math.random() > 0.9 && !MaliciousScrip) {
      const newMaliciousScrips = (
        <MaliciousScrips X={window.innerWidth + 10} Y={-10} ref={MaliciousScripsRef}></MaliciousScrips>
      );
      setMaliciousScrip(newMaliciousScrips);
    }
  };

  useEffect(() => {
    Ticks.current.push({
      timeRef: generateTimeRef,
      timeOut: 3000,
      callBack: generate
    });
  }, []);

  return { MaliciousScripsRef, MaliciousScrip, setMaliciousScrip };
}
