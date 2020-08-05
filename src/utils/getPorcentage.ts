export default function getPorcentage(
  total: number,
  numberToGetPorcentage: number,
): number {
  return (numberToGetPorcentage * 100) / total;
}
