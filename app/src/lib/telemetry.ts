/**
 * Telemetry - Event logging for user behavior insights
 *
 * Currently logs to console in development only.
 * Future: Integrate with analytics vendors (PostHog, Mixpanel, etc.)
 */

/**
 * Event data structure
 */
export interface TelemetryEvent {
  event: string;
  data: Record<string, unknown>;
  timestamp: number;
}

/**
 * Logs a telemetry event
 *
 * @param event - Event name (e.g., 'quiz_attempt', 'lesson_completed')
 * @param data - Event properties (e.g., { lessonSlug, correct, attempts })
 *
 * @example
 * ```ts
 * logEvent('quiz_attempt', {
 *   lessonSlug: 'intro',
 *   correct: true,
 *   attemptsUsed: 1
 * });
 * ```
 */
export function logEvent(event: string, data: Record<string, unknown> = {}): void {
  const telemetryEvent: TelemetryEvent = {
    event,
    data,
    timestamp: Date.now()
  };

  // Development: Log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Telemetry] ${event}`,
      {
        ...data,
        _timestamp: new Date(telemetryEvent.timestamp).toISOString()
      }
    );
  }

  // Production: Send to analytics vendor
  // TODO: Integrate with PostHog, Mixpanel, or other analytics platform
  // Example:
  // if (typeof window !== 'undefined' && window.analytics) {
  //   window.analytics.track(event, data);
  // }
}

/**
 * Logs a page view event
 *
 * @param path - Page path (e.g., '/lesson/intro')
 * @param properties - Additional properties
 */
export function logPageView(path: string, properties: Record<string, unknown> = {}): void {
  logEvent('page_view', {
    path,
    ...properties
  });
}

/**
 * Logs a user interaction event
 *
 * @param action - Interaction type (e.g., 'click', 'submit')
 * @param target - Target element or component
 * @param properties - Additional properties
 */
export function logInteraction(
  action: string,
  target: string,
  properties: Record<string, unknown> = {}
): void {
  logEvent('user_interaction', {
    action,
    target,
    ...properties
  });
}

/**
 * Logs an error event
 *
 * @param error - Error object or message
 * @param context - Additional context
 */
export function logError(error: Error | string, context: Record<string, unknown> = {}): void {
  const errorData = error instanceof Error
    ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    : { message: error };

  logEvent('error', {
    ...errorData,
    ...context
  });
}

const telemetry = {
  logEvent,
  logPageView,
  logInteraction,
  logError
};

export default telemetry;
