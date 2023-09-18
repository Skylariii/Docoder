export function getDPR(floor = false) {
  return floor ? Math.floor(window.devicePixelRatio) : window.devicePixelRatio;
}
