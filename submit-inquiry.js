import { isStaticPreview, showPreviewNotice } from './static-preview.js';
import { INQUIRY_STATUS, SUBMISSION_MESSAGES } from './inquiry-contract.js';
import { applyLanguage, getLanguage, translate } from './language.js';

const REQUEST_TIMEOUT_MILLISECONDS = 45_000;
export async function submitInquiry(form, requestType, successState) {
  if (isStaticPreview()) { showPreviewNotice(form); return; }
  if (form.dataset.sending === 'true') return;
  const submitButton = form.querySelector('[type="submit"]');
  const errorNotice = form.querySelector('.form-error');
  const originalMarkup = submitButton.innerHTML;
  const payload = Object.fromEntries(new FormData(form));
  payload.requestType = requestType;
  payload.language = getLanguage();
  payload.consent = form.querySelector('[name="consent"]').checked;
  if (!form.dataset.requestId) form.dataset.requestId = crypto.randomUUID();
  payload.requestId = form.dataset.requestId;
  form.dataset.sending = 'true';
  submitButton.disabled = true;
  submitButton.textContent = translate(SUBMISSION_MESSAGES.SENDING);
  errorNotice.hidden = true;
  try {
    const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(REQUEST_TIMEOUT_MILLISECONDS) });
    const result = await response.json();
    if (!response.ok || result.code !== INQUIRY_STATUS.SENT) {
      let message = SUBMISSION_MESSAGES.FAILED;
      if (result.code === INQUIRY_STATUS.RATE_LIMITED) message = SUBMISSION_MESSAGES.RATE_LIMITED;
      if (result.code === INQUIRY_STATUS.INVALID_INQUIRY) message = SUBMISSION_MESSAGES.INVALID;
      throw new Error(message);
    }
    form.hidden = true;
    successState.classList.add('active');
    const heading = successState.querySelector('h3');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  } catch (error) {
    let message = error.message;
    if (![SUBMISSION_MESSAGES.FAILED, SUBMISSION_MESSAGES.RATE_LIMITED, SUBMISSION_MESSAGES.INVALID].includes(message)) message = SUBMISSION_MESSAGES.FAILED;
    errorNotice.textContent = translate(message);
    errorNotice.hidden = false;
  } finally {
    form.dataset.sending = 'false';
    submitButton.disabled = false;
    submitButton.innerHTML = originalMarkup;
    applyLanguage();
  }
}
