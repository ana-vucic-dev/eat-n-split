export default function shakeInputField(inputEl) {
  inputEl.classList.remove('input-shake');

  requestAnimationFrame(() => {
    inputEl.classList.add('input-shake');
  });

  inputEl.addEventListener(
    'animationend',
    () => inputEl.classList.remove('input-shake'),
    { once: true }
  );
}
