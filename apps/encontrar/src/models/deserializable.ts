// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Deserializable<T> {
  deserialize(input: T): this;
}
