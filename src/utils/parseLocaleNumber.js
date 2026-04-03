export default function parseLocaleNumber(value) {
  if (value === '' || value === ',' || value === '.') {
    return 0;
  }

  return Number(value.replace(',', '.'));
}
