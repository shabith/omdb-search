export function capitalisation(str: string) {
  const [firstLetter, ...rest] = str.split('');
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
}
