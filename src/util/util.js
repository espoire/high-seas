export function echo(x) {
  return x;
}

export function squared(x) {
  return x * x;
}

export function isNumber(x) {
  return typeof x === 'number' && !isNaN(x)
}

export function fancyToFixed(number, maxFractionDigits) {
  let currentDigits = maxFractionDigits;
  let current = number.toFixed(currentDigits);

  while (currentDigits > 0) {
    currentDigits--;
    const next = number.toFixed(currentDigits);
    if (+current !== +next) return current;
    current = next;
  }

  return current;
}