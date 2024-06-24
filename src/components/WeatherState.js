import { randomLow } from "../util/random.js";

export default class WeatherState {
  active = {
    overcast: 1,
    wind: 0.1,
  };
  target = {
    overcast: 0,
    wind: 0.3,
  };
  cooldown = {
    overcast: 0,
    wind: 0,
  };
  cycle = 0;

  static parameters = {
    overcast: {
      targetGenerator: randomLow,
      convergence: 1 / 50,
    },
    wind: {
      targetGenerator: randomLow,
      convergence: 1 / 10,
    },
  };

  update() {
    this.cycle++;

    for (const key in WeatherState.parameters) {
      if (this.cycle <= this.cooldown[key] || Math.random() > 1 / 300) continue;
      this.target[key] = WeatherState.parameters[key].targetGenerator();
      this.cooldown[key] = this.cycle + 100;
    }

    for (const key in this.active) {
      const diff = this.target[key] - this.active[key];
      this.active[key] += diff * WeatherState.parameters[key].convergence;
    }
  }
}
