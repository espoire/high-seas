import { squared } from "./util.js";

// roundRandom - Rounds a number to a nearby integer, randomly.
//   Example: 1.2 will become either 1 or 2. 80% will be 1, 20% will be 2.
export function roundRandom(amount, randomFunc) {
  const roll = (randomFunc || Math.random)();

  if (roll < amount % 1) {
    return Math.ceil(amount);
  } else {
    return Math.floor(amount);
  }
}

export function randomLow(randomFunc) {
  return squared(
    (randomFunc || Math.random)()
  );
}

export function randomHigh(randomFunc) {
  return Math.sqrt(
    (randomFunc || Math.random)()
  );
}

export function randomRange(low, high, randomFunc) {
  const roll = (randomFunc || Math.random)();
  return low + (high - low) * roll;
}