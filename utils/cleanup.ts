export function onlyAlphabetsAndNumbers(input: string): string {
  return input.replaceAll(new RegExp(/[^a-zA-Z0-9]/g), "");
}
