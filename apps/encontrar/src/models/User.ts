import { Deserializable } from './deserializable';

export class User implements Deserializable<User> {
  id?: number;
  email = '';
  username = '';
  password = '';
  name = '';
  telefone = '';
  is_actived = false;
  loja_id?: number;
  direccao_id?: number;
  loja?: null;
  empresa?: null;
  deserialize(input: Partial<User>): this {
    Object.assign(this, input);
    return this;
  }
}
