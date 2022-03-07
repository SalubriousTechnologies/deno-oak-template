export function genTimeStamp(): string {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = getStringOnly(date.getUTCMonth() + 1);
  const hours = getStringOnly(date.getUTCHours());
  const minutes = getStringOnly(date.getUTCMinutes());
  const seconds = getStringOnly(date.getUTCMinutes());
  return `${year}${month}${date.getUTCDate().toLocaleString("en-us", {
    minimumIntegerDigits: 2,
  })}${hours}${minutes}${seconds}`;
}

function getStringOnly(self: number): string {
  return self.toLocaleString("en-us", { minimumIntegerDigits: 2 });
}
