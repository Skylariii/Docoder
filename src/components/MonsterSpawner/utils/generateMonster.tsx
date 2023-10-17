import BugScrips from '../../EnemySprites/BugScrips';

export interface Monster {
  monster?: JSX.Element;
  monsterRef?: JSX.Element | undefined;
}

export interface Props {
  key: number;
  position: {
    X: number;
    Y: number;
  };
}
export default function generateMonster(props: Props) {
  const {
    key,
    position: { X, Y }
  } = props;
  const newMonster: Monster = {
    monsterRef: undefined
  };
  newMonster.monster = (
    <BugScrips
      key={key}
      X={X}
      Y={Y}
      ref={(ref: JSX.Element) => {
        newMonster.monsterRef = ref;
      }}
    />
  );

  return newMonster;
}
