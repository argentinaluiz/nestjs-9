import { validate as uuidValidate } from 'uuid';
import UniqueEntityId from './unique-entity-id';

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    //@ts-expect-error - this is a test
    const spyValidate = jest.spyOn(UniqueEntityId.prototype, 'validate');
    expect(() => new UniqueEntityId('invalid-uuid')).toThrowError(
      'The invalid-uuid is not a valid uuid.',
    );
    expect(spyValidate).toHaveBeenCalled();
  });

  test('constructor', () => {
    let uniqueEntityId = new UniqueEntityId();

    expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();

    uniqueEntityId = new UniqueEntityId('31fa1390-54ca-41be-8e9c-3e8c6a8407ec');
    expect(uniqueEntityId.value).toBe('31fa1390-54ca-41be-8e9c-3e8c6a8407ec');
  });
});
