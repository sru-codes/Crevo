// ==========================================
// 📈 MONITORING & LOGGING LAYER
// Enterprise Logger instance mapping formats
// to Datadog / OpenTelemetry standards
// ==========================================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

interface LogContext {
  userId?: string;
  requestId?: string;
  platform?: string;
  env?: string;
  tags?: string[];
  [key: string]: any;
}

class CrevoLogger {
  private baseContext: LogContext;
  
  constructor() {
    this.baseContext = {
      env: process.env.NODE_ENV || 'development',
      service: 'crevo-fullstack',
    };
  }
  
  private formatLog(level: string, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...this.baseContext,
      ...context,
    });
  }

  // Used for debugging Database or Backend issues
  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatLog('DEBUG', message, context));
    }
  }

  // Used for standard App logic (API hits, job completions)
  info(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'test') {
      console.info(this.formatLog('INFO', message, context));
    }
  }

  warning(message: string, context?: LogContext) {
    console.warn(this.formatLog('WARN', message, context));
  }

  // Triggers Incident alerts in production
  error(message: string, error?: Error, context?: LogContext) {
    const errContext = error ? { stack: error.stack, name: error.name } : {};
    console.error(this.formatLog('ERROR', message, { ...errContext, ...context }));
    
    // In production, sync to Sentry / Datadog agents:
    // Sentry.captureException(error);
  }
}

export const logger = new CrevoLogger();
