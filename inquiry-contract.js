export const INQUIRY_TYPES = Object.freeze({ QUOTE: 'quote', CALL: 'call' });
export const INQUIRY_STATUS = Object.freeze({
  SENT: 'SENT', INVALID_INQUIRY: 'INVALID_INQUIRY', METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  INVALID_ORIGIN: 'INVALID_ORIGIN', INVALID_CONTENT_TYPE: 'INVALID_CONTENT_TYPE',
  RATE_LIMITED: 'RATE_LIMITED', ALREADY_SENDING: 'ALREADY_SENDING',
  EMAIL_NOT_CONFIGURED: 'EMAIL_NOT_CONFIGURED', EMAIL_FAILED: 'EMAIL_FAILED',
  BODY_TOO_LARGE: 'BODY_TOO_LARGE', EMAIL_NOT_ACCEPTED: 'EMAIL_NOT_ACCEPTED',
});
export const SUBMISSION_MESSAGES = Object.freeze({
  SENDING: 'Sending…',
  FAILED: 'Your request could not be sent. Your details are still here. Please retry or email triconglobaltrading@gmail.com directly.',
  RATE_LIMITED: 'Too many attempts. Please wait 15 minutes or email triconglobaltrading@gmail.com directly.',
  INVALID: 'Please check your entries and consent, then try again.',
});
