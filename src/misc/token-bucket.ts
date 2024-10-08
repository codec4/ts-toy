export class TokenBucket {
  #capacity: number;
  #tokens: number;

  constructor(capacity: number, fillPerSecond: number) {
    this.#capacity = capacity;
    this.#tokens = capacity;
    setInterval(() => this.addToken(), 1000 / fillPerSecond);
  }

  addToken() {
    if (this.#tokens < this.#capacity) {
      this.#tokens += 1;
    }
  }

  take() {
    if (this.#tokens > 0) {
      this.#tokens -= 1;
      return true;
    }

    return false;
  }
}
