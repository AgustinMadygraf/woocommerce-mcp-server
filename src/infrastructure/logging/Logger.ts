export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static level: LogLevel = LogLevel.INFO;

  static setLevel(level: LogLevel) {
    this.level = level;
  }

  private static log(level: LogLevel, message: string, ...args: any[]) {
    if (level >= this.level) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      const formattedMessage = `[${timestamp}] [${levelName}] ${message}`;
      
      // We use console.error to write to stderr, as stdout is reserved for JSON-RPC
      console.error(formattedMessage, ...args);
    }
  }

  static debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  static info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  static warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  static error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }
}
