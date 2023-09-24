export default function remToPx(rem: number) {
  return (document.documentElement.clientWidth / 100) * rem;
}
