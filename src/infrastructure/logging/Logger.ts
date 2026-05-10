import { Logger as CoreLogger, LogLevel as CoreLogLevel } from "mcp-server-core";

export { CoreLogLevel as LogLevel };

export class Logger {
  private static core = CoreLogger.getInstance();

  static setLevel(level: CoreLogLevel) {
    this.core.setLevel(level);
  }

  static debug(message: string, ...args: any[]) {
    this.core.debug(message, ...args);
  }

  static info(message: string, ...args: any[]) {
    this.core.info(message, ...args);
  }

  static warn(message: string, ...args: any[]) {
    this.core.warn(message, ...args);
  }

  static error(message: string, ...args: any[]) {
    this.core.error(message, ...args);
  }
}
