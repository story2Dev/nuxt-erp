import type { KeyValue } from '~/types';

function convertCamelToSnake(str: any) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function convertSnakeToCamel(str: any) {
  return str.replace(/([-_][a-z])/gi, ($1: any) => {
    return $1.toUpperCase().replace('_', '');
  });
}

export function getCamelCase(input: any): any {
  if (Array.isArray(input)) {
    // Handle array of objects
    if (input.length > 0 && typeof input[0] === 'object') {
      return input.map(getCamelCase);
    } else {
      return input; // Array without keys
    }
  } else if (typeof input === 'object' && input !== null) {
    const output: any = {};

    for (const key in input) {
      if (typeof input[key] === 'object' && input[key] !== null) {
        // Recursively convert nested objects
        if (Array.isArray(input[key])) {
          // Handle the case where an object is converted to an array
          output[convertSnakeToCamel(key)] = input[key].map(getCamelCase);
        } else {
          output[convertSnakeToCamel(key)] = getCamelCase(input[key]);
        }
      } else {
        // Convert property names for non-object values
        output[convertSnakeToCamel(key)] = input[key];
      }
    }

    return output;
  } else {
    return input;
  }
}

export function getSnakeCase(input: any): any {
  if (Array.isArray(input)) {
    // Handle array of objects
    if (input.length > 0 && typeof input[0] === 'object') {
      return input.map(getSnakeCase);
    } else {
      return input; // Array without keys
    }
  } else if (typeof input === 'object' && input !== null) {
    const output: any = {};

    for (const key in input) {
      if (typeof input[key] === 'object' && input[key] !== null) {
        // Recursively convert nested objects
        if (Array.isArray(input[key])) {
          // Handle the case where an object is converted to an array
          output[convertCamelToSnake(key)] = input[key].map(getSnakeCase);
        } else {
          output[convertCamelToSnake(key)] = getSnakeCase(input[key]);
        }
      } else {
        // Convert property names for non-object values
        output[convertCamelToSnake(key)] = input[key];
      }
    }

    return output;
  } else {
    return input;
  }
}

export function toCamelCase(input: any) {
  if (Array.isArray(input)) {
    return input.map((item) => getCamelCase(item));
  }
  return getCamelCase(input);
}

export function toHasuraInput(input: any) {
  if (Array.isArray(input)) {
    return input.map((item) => getSnakeCase(item));
  }
  return getSnakeCase(input);
}

export function arrayToObject(arr: KeyValue[]): { [key: string]: number } {
  const result: { [key: string]: number } = {};

  arr.forEach((item) => {
    if (typeof item.key === 'string') {
      // Ensure the value is a number before assigning
      const numericValue =
        typeof item.value === 'number'
          ? item.value
          : parseFloat(item.value as string);
      result[item.key] = isNaN(numericValue) ? 0 : numericValue;
    }
  });

  return result;
}

type NestedObject = { [key: string]: NestedObject | string | number | boolean };

/**
 *
 * @param input
 * @returns object { key: mode }
 * @example const input = { key: 'a.b.c', mode: 'asc' }
 * // output = { a: { b: { c: 'asc' } } }
 */
export const convertToNestedObjectOrderBy = (input: any): NestedObject => {
  const result: NestedObject = {};
  const keys: string[] = input.key.split('.');
  let temp: NestedObject = result;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      temp[key] = input.mode;
    } else {
      temp[key] = temp[key] || {};
      temp = temp[key] as NestedObject;
    }
  });

  return result;
};
