import Primitive from './Primitive';

type FormFieldValue = Primitive | Primitive[] | File | File[] | Record<string, Primitive> | Record<string, Primitive>[];

export default FormFieldValue;
