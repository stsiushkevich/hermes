/*
 Gets nested properties from JavaScript object
 *
 * examples:
 * const prop = getProperty(obj, "prop1.nestedProp1");
 * const prop = getProperty(obj, "prop1.[0].nestedProp1");
 * */
export function getProperty<T extends object>(target: T, key: string): unknown {
  if (!target) return undefined;

  let cursor: T | unknown = target;
  const path = key.replace(/\[(\w+)]/g, '$1').split('.');

  for (let i = 0; i < path.length; i += 1) {
    const k = path[i];
    if (typeof cursor === 'object' && k in cursor) cursor = cursor[k];
    else return undefined;
  }

  return cursor;
}

/*
 Sets nested properties into JavaScript object
 *
 * example:
 * const target = {}
 *
 * setProperty(target, "prop1.nestedProp1", 123);
 * setProperty(target, "prop2.[1].nestedProp1", "some text");
*
 * console.log(target) // { prop1: { nestedProp1: 123 }, prop2: [undefined,{ nestedProp1: "some text" }] }
 * */
export function setProperty<T extends object>(target: T, key: string, value: unknown): T {
  let cursor: T | unknown = target;
  const path = key.replace(/\[(\w+)]/g, '$1').split('.');

  while (path.length - 1) {
    const prop = path.shift();

    if ((Array.isArray(cursor) || typeof cursor === 'object') && !(prop in cursor)) {
      cursor[prop] = Number.isInteger(+path[0]) ? [] : {};
    }

    cursor = cursor[prop];
  }

  cursor[path[0]] = value;

  return target;
}
