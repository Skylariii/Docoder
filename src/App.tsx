import { Stage, Text } from '@pixi/react';

import './App.css';
function App() {
  return (
    <Stage options={{ backgroundColor: 0xeef1f5 }}>
      <Text text="main" x={150} y={150} anchor={{ x: 0.5, y: 0.5 }} />
    </Stage>
  );
}

export default App;
