import { randomLow } from "../util/random.js";

export default class WeatherState {
  current = {
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

    for (const key in this.current) {
      const diff = this.target[key] - this.current[key];
      this.current[key] += diff / 50;
    }

    console.log('Current: ', this.current.overcast.toFixed(2));
    // console.log('Targets: ', this.target);
  }
}