import UniqueEntityId from '../value-objects/unique-entity-id';

export type BankAccountProps = {
  balance: number;
  account_number: string;
};

export class BankAccount {
  
  uniqueId: UniqueEntityId;
  
  private constructor(
    public readonly props: BankAccountProps,
    uniqueId?: UniqueEntityId,
  ) {
    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: BankAccountProps, uniqueId?: UniqueEntityId) {
    return new BankAccount(props, uniqueId);
  }

  debit(amount: number) {
    this.balance -= amount;
  }

  credit(amount: number) {
    this.balance += amount;
  }

  // não é possível
  // update(account_number: string){
  //   this.account_number = account_number;
  // }

  get id() {
    return this.uniqueId.value;
  }

  private set id(value: string) {
    this.uniqueId = new UniqueEntityId(value);
  }

  get balance() {
    return this.props.balance;
  }

  private set balance(value: number) {
    this.props.balance = value;
  }

  get account_number() {
    return this.props.account_number;
  }

  private set account_number(value: string) {
    this.props.account_number = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
