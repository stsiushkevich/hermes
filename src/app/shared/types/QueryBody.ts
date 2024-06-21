import Primitive from './Primitive';

type QueryBody = Record<string, Primitive | Primitive[] | object | object[]>;

export default QueryBody;
