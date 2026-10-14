import { translate } from './language.js';

export const PREVIEW_NOTICE = 'GitHub preview: forms do not send requests.';
export function isStaticPreview() {
  return document.querySelector('meta[name="tricon-static-preview"]')?.content === 'true';
}
export function initializeStaticPreview() {
  if (!isStaticPreview()) return;
  const banner = document.createElement('div');
  banner.className = 'preview-banner';
  const message = document.createElement('span');
  message.textContent = PREVIEW_NOTICE;
  const link = document.createElement('a');
  link.href = 'mailto:triconglobaltrading@gmail.com';
  link.textContent = 'Email us directly';
  banner.append(message, link);
  document.querySelector('main').prepend(banner);
}
export function showPreviewNotice(form) {
  const notice = form.querySelector('.form-error');
  notice.textContent = translate(PREVIEW_NOTICE);
  notice.hidden = false;
}
