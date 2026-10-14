import { french } from './translations-fr.js';
const LANGUAGE_STORAGE_KEY = 'tricon-language';
let language = 'en';
try { if (localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'fr') language = 'fr'; } catch { /* The site still works when browser storage is disabled. */ }
const originalTexts = new WeakMap();
const englishByFrench = new Map(Object.entries(french).map(([english, translated]) => [translated, english]));
const originalAttributes = new WeakMap();
export function getLanguage() { return language; }
export function translate(text) {
  if (language === 'en') return text;
  if (Object.hasOwn(french, text)) return french[text];
  return text;
}
export function applyLanguage() {
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.querySelector('#app'), NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!originalTexts.has(node)) originalTexts.set(node, node.textContent.replace(node.textContent.trim(), englishByFrench.get(node.textContent.trim()) || node.textContent.trim()));
    const source = originalTexts.get(node);
    const normalized = source.trim();
    node.textContent = source.replace(normalized, translate(normalized));
  }
  for (const element of document.querySelectorAll('[aria-label], [placeholder]')) {
    if (!originalAttributes.has(element)) originalAttributes.set(element, { label: element.getAttribute('aria-label'), placeholder: element.getAttribute('placeholder') });
    const attributes = originalAttributes.get(element);
    if (attributes.label) element.setAttribute('aria-label', translate(attributes.label));
    if (attributes.placeholder) element.setAttribute('placeholder', translate(attributes.placeholder));
  }
  const toggle = document.querySelector('.lang-toggle');
  let label = 'Switch to French';
  if (language === 'fr') label = 'Passer en anglais';
  toggle.textContent = 'EN / FR';
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('aria-pressed', String(language === 'fr'));
  document.title = `${document.querySelector('h1').textContent} — Tricon Global Trading`;
}
export function toggleLanguage() {
  if (language === 'en') language = 'fr';
  else language = 'en';
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch { /* Retain the choice for this page when storage is disabled. */ }
  applyLanguage();
}
