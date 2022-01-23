export function strToHash(target: string): number {
  let hash = 0;
  let i: number;
  let chr: number;
  if (target.length === 0) return hash;
  for (i = 0; i < target.length; i += 1) {
    chr = target.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}
