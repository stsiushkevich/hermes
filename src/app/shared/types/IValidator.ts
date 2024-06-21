import ValidationErrors from './ValidationErrors';

export default interface IValidator<Data, Errors extends ValidationErrors> {
  validate(data: Data, options?: object): Promise<boolean | Errors>
}
