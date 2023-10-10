import { useCallback } from 'react';
import { Graphics } from '@pixi/react';

export default function Circle(props) {
  const { x, y, size, handleClick } = props;

  const draw = useCallback((g) => {
    g.clear();
    g.beginFill('rgba(0,0,0,0.1)', 0.5);
    g.drawCircle(x, y, size);
    g.endFill();
  }, []);

  return <Graphics draw={draw} interactive={true} pointerdown={handleClick} />;
}
