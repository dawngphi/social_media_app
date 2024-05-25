export enum ANSI_COLOR_CODES {
  reset = "\x1b[0m",
  bright = "\x1b[1m",
  dim = "\x1b[2m",
  underscore = "\x1b[4m",
  blink = "\x1b[5m",
  reverse = "\x1b[7m",
  hidden = "\x1b[8m",

  fgBlack = "\x1b[30m",
  fgRed = "\x1b[31m",
  fgGreen = "\x1b[32m",
  fgYellow = "\x1b[33m",
  fgBlue = "\x1b[34m",
  fgMagenta = "\x1b[35m",
  fgCyan = "\x1b[36m",
  fgWhite = "\x1b[37m",

  bgBlack = "\x1b[40m",
  bgRed = "\x1b[41m",
  bgGreen = "\x1b[42m",
  bgYellow = "\x1b[43m",
  bgBlue = "\x1b[44m",
  bgMagenta = "\x1b[45m",
  bgCyan = "\x1b[46m",
  bgWhite = "\x1b[47m",
}
function getLogTime():string{
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.getMonth() + 1; // Month started at 0
  const year = currentTime.getFullYear();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export const useLogger = (title: string, color: ANSI_COLOR_CODES = ANSI_COLOR_CODES.fgWhite) => {
  return function(msg:any){
    const time:string = `${ANSI_COLOR_CODES.fgGreen} ${getLogTime()} ${ANSI_COLOR_CODES.reset}`
    const content:string =`${color}  [${title.toUpperCase()}] ${JSON.stringify(msg)} ${ANSI_COLOR_CODES.reset}`
    console.log(`${time} ${content}`)
  }
};
