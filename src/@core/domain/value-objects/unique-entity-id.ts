import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class UniqueEntityId {
  readonly value: string;
  constructor(id?: string) {
    this.value = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new Error(`The ${this.value} is not a valid uuid.`);
    }
  }
}

export default UniqueEntityId;
