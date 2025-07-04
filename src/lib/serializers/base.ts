//TODO: delete this file
export class BaseSerializer<T> {
  constructor(partial: Partial<T | null>) {
    Object.assign(this, partial);
  }
}
