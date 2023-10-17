import { useRef } from 'react';

export default function useLanMei() {
  const LanMei = useRef<any>(undefined);
  function jump() {
    if (LanMei.current) LanMei.current.jump();
  }
  function attack() {
    if (LanMei.current) LanMei.current.attack();
  }
  return { LanMei, attack, jump };
}
