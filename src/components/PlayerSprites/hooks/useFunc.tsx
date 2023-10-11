
import { Status } from '../constant';

interface Props {
  ES: number;
  POW: number;
  setES: Function;
  setPOW: Function;
  setStatus: Function;
}

export default function useJump(props: Props) {
  const { ES, POW, setES, setPOW, setStatus } = props;

  //增加护盾
  function addES() {
    setES(ES + 1);
  }

  //双倍能量
  function dubblePOW() {
    if (POW * 2 > 100) {
      setPOW(100);
    } else {
      setPOW(POW * 2);
    }
  }

  //无敌冲刺
  function invincibleSprint() {
    setStatus(Status.SPRINTING);
  }

  return {};
}
