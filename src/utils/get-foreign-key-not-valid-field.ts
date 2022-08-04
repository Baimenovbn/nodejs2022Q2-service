const FIELD_KEY_INDEX = 1;

export const getForeignKeyNotValidField = (e: any) => {
  return e.meta.field_name.split('_')[FIELD_KEY_INDEX];
};
