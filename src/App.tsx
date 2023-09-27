import { Stage, Text } from '@pixi/react';
import { getDPR } from './utils/getDPR';
import './App.scss';
import { remToPx } from './utils/remToPx';
import { LegacyRef, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { detectOrient } from './utils/detectOrient';
import EnemySprites from './components/EnemySprites';
function App() {
  const stageRef = useRef<unknown>();
  // console.log(stageRef.current.app);
  useEffect(() => {
    if (stageRef.current) {
      const { current } = stageRef as { current: { app: PIXI.Application } };
      if (current) {
        const app = current.app;
        console.log(app);
        window.onresize = () => {
          detectOrient(app);
        };
        detectOrient(app);
      }
    }
  }, [stageRef]);

  return (
    <Stage
      ref={stageRef as LegacyRef<Stage>}
      id="1"
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ backgroundColor: 0xeef1f5 }}
    >
      <EnemySprites type={'bug'} />
      <EnemySprites type={'maliciousScrips'} />
    </Stage>
  );
}

export default App;
