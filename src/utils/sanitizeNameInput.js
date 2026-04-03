export default function sanitizeNameInput(value) {
  value = value
    .replace(/\s{2,}/g, ' ')
    .replace(/[-’']{2,}/g, match => match[0]);

  return value;
}
