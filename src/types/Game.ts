import { DateTime } from "luxon";

export class Game {
  readonly createdAt: string;
  readonly slug: string;

  constructor(slug: string) {
    this.createdAt = DateTime.now().toISO();
    this.slug = slug;
  }
}

export default Game;
