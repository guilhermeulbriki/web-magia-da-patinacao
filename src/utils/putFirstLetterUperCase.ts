export default function putFirstLetterUperCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
