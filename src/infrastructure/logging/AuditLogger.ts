import { Logger } from "./Logger";
import * as fs from "fs";
import * as path from "path";

export class AuditLogger {
  private static auditFilePath = path.join(process.cwd(), "audit.log");

  static logAction(action: string, details: any) {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };

    const logMessage = `[AUDIT] ${JSON.stringify(entry)}`;
    
    // Log to stderr (captured by MCP host)
    Logger.info(logMessage);

    // Also log to a local file for persistence within the session environment
    try {
      fs.appendFileSync(this.auditFilePath, logMessage + "\n");
    } catch (error) {
      Logger.error("Failed to write to audit log file", error);
    }
  }
}
