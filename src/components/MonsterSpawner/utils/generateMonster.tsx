import BugScrips from '../../EnemySprites/BugScrips';

export interface Monster {
  monster?: JSX.Element;
  monsterRef?: JSX.Element | undefined;
}
export default function generateMonster(key: number) {
  const newMonster: Monster = {
    monsterRef: undefined
  };
  newMonster.monster = (
    <BugScrips
      key={key}
      X={window.innerWidth + 20}
      Y={200}
      ref={(ref: JSX.Element) => {
        newMonster.monsterRef = ref;
      }}
    />
  );

  return newMonster;
}
