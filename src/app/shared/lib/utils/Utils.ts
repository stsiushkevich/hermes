export function copyToClipboard(value: string) {
  if (value) void navigator.clipboard.writeText(value);
}
export function noop() {}

export function defer(delay = 0, ...args: []) {
  return new Promise<unknown>((resolve) => {
    setTimeout(() => { resolve(null, ...args); }, delay);
  });
}

export function interpolate(s: string, ...vals: string[]) {
  let res = '';
  for (let i = 0; i < vals.length; i += 1) {
    res = s.replace(new RegExp(`\\$${i}`, 'g'), vals[i]);
  }
  return res;
}

export function isNulOrUndefined(v: unknown) {
  return v === null || v === undefined;
}

/**
 * checks empty values: null, undefined, NaN, '', [], {}
 * */
export function isEmpty(o: unknown) {
  if (Number.isNaN(o)) return true;
  if (isNulOrUndefined(o)) return true;
  if (typeof o === 'string') return o === '';
  if (Array.isArray(o)) return !o?.length;
  if (typeof o === 'object') return !Object.keys(o).length;
  return false;
}

export function isNotEmpty(o: unknown) {
  return !isEmpty(o);
}

export function isNumber(v: unknown) {
  return typeof v === 'number'
}


export function isInteger(v: unknown) {
  return Number.isInteger(v);
}
