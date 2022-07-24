export class ForeignKeyIsNotValid extends Error {
  constructor(entityName: string) {
    super(`No ${entityName} with given id has been found`);
  }
}
