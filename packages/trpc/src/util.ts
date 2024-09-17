export function sleep(timeMs: number) {
  return new Promise((res) => setTimeout(res, timeMs));
}
