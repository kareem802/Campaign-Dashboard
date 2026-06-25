
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatLeadsCount(value: number, useAbbreviation = false): string {
  if (useAbbreviation && value >= 1000) {
    return (value / 1000).toPrecision(3).replace(/\.0+$/, '') + 'K';
  }
  return formatNumber(value);
}
