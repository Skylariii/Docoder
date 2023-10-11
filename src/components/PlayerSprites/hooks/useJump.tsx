import { useEffect } from 'react';
import { HEIGHT } from '../constant';

interface Props {
  h: number;
  v: number;
  setH: Function;
  setV: Function;
}

export default function useJump(props: Props) {
  const { h, v, setH, setV } = props;

  let animationFrame: any;
  let g = 0.7;

  useEffect(() => {
    animationFrame = requestAnimationFrame(animate);
    if (h >= HEIGHT) {
      cancelAnimationFrame(animationFrame);
    }
  }, [h, v]);

  const animate = () => {
    setV((pv: number) => {
      setH((ph: number) => {
        return ph - pv;
      });
      return pv - g;
    });
  };

  const jump = () => {
    if (h < HEIGHT) return false; //未掉落之前不允许点击跳跃
    setV(15);
    animate();
  };

  return {
    jump
  };
}
