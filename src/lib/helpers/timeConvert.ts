export const timeConvert = (time: number): string => {
  const min = Math.floor(time / 60);
  const sec = ("0" + Math.floor(time % 60).toString()).slice(-2);

  return `${min}:${sec}`;
};
