export function transformDate(date: string) {
  const now = new Date();
  const hourNow = now.getHours();
  const datetime = new Date(date);
  const hour = datetime.getHours();
  return Number(hourNow - hour);
}
