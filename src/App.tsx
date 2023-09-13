import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, useTick } from '@pixi/react';
import { useMemo, useRef } from 'react';
import './App.css';
function App() {
  const blurFilter = useMemo(() => new BlurFilter(4), []);
  const A = <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} />;
  console.log(A);

  return (
    <Stage>
      <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} />

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
  );
}

export default App;
