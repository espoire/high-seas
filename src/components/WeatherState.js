import { randomLow } from "../util/random.js";

export default class WeatherState {
  active = {
    overcast: 1,
    wind: 0.1,
  }
  target = {
    overcast: 0,
    wind: 0.3,
  }

  static targetGenerators = {
    overcast: randomLow,
    wind: randomLow,
  }

  update() {
    for (const key in WeatherState.targetGenerators) {
      if (Math.random() > 1/300) continue;
      this.target[key] = WeatherState.targetGenerators[key]();
    }

    for (const key in this.active) {
      const diff = this.target[key] - this.active[key];
      this.active[key] += diff / 50;
    }
  }
}