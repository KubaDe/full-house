export class Deferred<T extends undefined = undefined> {
  private readonly _promise: Promise<T | undefined>;
  private _resolve?: (value: T | undefined) => void;
  private _reject?: (reason?: unknown) => void;

  constructor() {
    this._promise = new Promise<T | undefined>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  get promise(): Promise<T | undefined> {
    return this._promise;
  }

  resolve = (value?: T): void => {
    if (!this._resolve) {
      throw new Error("resolve is not a function");
    }
    this._resolve(value);
  };

  reject = (reason?: unknown): void => {
    if (!this._reject) {
      throw new Error("reject is not a function");
    }
    this._reject(reason);
  };
}
