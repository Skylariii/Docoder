import React, { useRef } from 'react';
import BugScrips from '../../EnemySprites/BugScrips';

export interface Monster {
  monster: JSX.Element;
  monsterRef: React.MutableRefObject<JSX.Element | undefined>;
}
export default function useGenerateMonster(key: number) {
  const monsterRef = useRef<JSX.Element>();
  const monster = <BugScrips key={key} X={window.innerWidth + 20} Y={200} ref={monsterRef} />;
  const newMonster: Monster = {
    monster,
    monsterRef
  };

  return newMonster;
}
