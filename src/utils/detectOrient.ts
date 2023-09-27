import { Application, ICanvas } from 'pixi.js';

export default function detectOrient(app: Application<ICanvas>) {
  console.log(app);

  let width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight,
    $wrapper = document.getElementById('root'),
    style = '';

  if (getOrientation() === 'landscape') {
    // 横屏
    style = `
      width: ${width}px;
      height: ${height}px;
      -webkit-transform: rotate(0); transform: rotate(0);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    `;
    app.renderer.resize(width, height);
  } else {
    // 竖屏
    style = `
      width: ${height}px;
      height: ${width}px;
      -webkit-transform: rotate(90deg); 
      transform: rotate(90deg);
      -webkit-transform-origin: ${width / 2}px ${width / 2}px;
      transform-origin: ${width / 2}px ${width / 2}px;
    `;
    app.renderer.resize(height, width);
  }
  if ($wrapper) $wrapper.style.cssText = style;
}

export function getOrientation() {
  const mql = window.matchMedia('(orientation: portrait)');

  return mql.matches ? 'portrait' : 'landscape';
}
