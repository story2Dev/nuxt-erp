export function convertCamelToSnake(str: any) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function getSnakeCase(input: any) {
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
}

export function toHasuraInput(input: any) {
  if (Array.isArray(input)) {
    return input.map((item) => getSnakeCase(item));
  }
  return getSnakeCase(input);
}
