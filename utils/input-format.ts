export const inputParse = (input: string) => {
  const nums = input.replace(/,/g, '').trim();
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
  return nums === '' ? null : Number.NaN;
};

export const inputFormat = (value: number | null) => {
  if (value === null) return '';
  return value.toLocaleString('en-US');
};
