import { ForeignKeyIsNotValid } from '../models/errors/foreign-key-is-not-valid';
import { getForeignKeyNotValidField } from './get-foreign-key-not-valid-field';

export const invalidForeignKeyWrapper = async <T>(cb: () => Promise<T>) => {
  try {
    return await cb();
  } catch (e) {
    throw new ForeignKeyIsNotValid(getForeignKeyNotValidField(e));
  }
};
