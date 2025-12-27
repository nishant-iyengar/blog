/**
 * Type Guard Utilities
 * 
 * Generic type guard functions to reduce duplicate validation logic
 * and provide consistent error handling throughout the codebase.
 */

/**
 * Generic type guard function that validates a value and throws an error if invalid
 * 
 * @param value - The value to validate
 * @param guard - A type guard function that returns true if value is valid
 * @param errorMessage - Error message to throw if validation fails
 * @returns The validated value with proper type
 * 
 * @example
 * const num = assertType(unknownValue, (v): v is number => typeof v === 'number', 'Expected number');
 */
export function assertType<T>(
  value: unknown,
  guard: (val: unknown) => val is T,
  errorMessage: string
): T {
  if (!guard(value)) {
    throw new Error(errorMessage);
  }
  return value;
}

/**
 * Validates that a value is not null or undefined
 */
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Validates that a value is an object (not null, not array, not primitive)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Validates that a value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Validates that a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Validates that a value is an array
 */
export function isArray<T>(value: unknown, elementGuard?: (val: unknown) => val is T): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }
  if (elementGuard) {
    return value.every(elementGuard);
  }
  return true;
}

/**
 * Validates that a value is an array of numbers
 */
export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number' && !isNaN(item));
}

/**
 * Validates that a value is a 2D array of numbers
 */
export function is2DNumberArray(value: unknown): value is number[][] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((row) => Array.isArray(row) && row.every((item) => typeof item === 'number' && !isNaN(item)))
  );
}

/**
 * Validates that a value is an instance of a specific class
 */
export function isInstanceOf<T>(
  value: unknown,
  constructor: new (...args: unknown[]) => T
): value is T {
  return value instanceof constructor;
}

/**
 * Validates that a value is an Error instance
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Validates that a value has a specific property
 */
export function hasProperty<K extends string>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return isObject(value) && key in value;
}

/**
 * Validates that a value has all specified properties
 */
export function hasProperties<K extends string>(
  value: unknown,
  keys: readonly K[]
): value is Record<K, unknown> {
  if (!isObject(value)) {
    return false;
  }
  return keys.every((key) => key in value);
}

/**
 * Validates that a property exists and matches a type guard
 */
export function hasPropertyOfType<T, K extends string>(
  value: unknown,
  key: K,
  guard: (val: unknown) => val is T
): value is Record<K, T> {
  if (!hasProperty(value, key)) {
    return false;
  }
  return guard(value[key]);
}

/**
 * Validates a value using multiple type guards (all must pass)
 */
export function satisfiesAll<T>(
  value: unknown,
  ...guards: Array<(val: unknown) => val is T>
): value is T {
  return guards.every((guard) => guard(value));
}

/**
 * Validates a value using multiple type guards (at least one must pass)
 */
export function satisfiesAny<T>(
  value: unknown,
  ...guards: Array<(val: unknown) => val is T>
): value is T {
  return guards.some((guard) => guard(value));
}

/**
 * Validates that a number is within a range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates that a value is a valid enum value
 */
export function isEnumValue<T extends string>(
  value: unknown,
  enumObject: Record<string, T>
): value is T {
  return typeof value === 'string' && Object.values(enumObject).includes(value as T);
}

/**
 * Validates that a key is a valid key of an object type
 */
export function isKeyOf<T extends Record<string, unknown>>(
  key: unknown,
  validKeys: readonly (keyof T)[]
): key is keyof T {
  return typeof key === 'string' && validKeys.includes(key as keyof T);
}

/**
 * Validates and parses JSON, then validates the result with a type guard
 */
export function parseAndValidate<T>(
  json: unknown,
  guard: (val: unknown) => val is T,
  errorMessage: string
): T {
  let parsed: unknown;
  
  if (typeof json === 'string') {
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error(`Invalid JSON: ${errorMessage}`);
    }
  } else {
    // If already an object, use JSON round-trip to create clean copy
    try {
      const jsonString = JSON.stringify(json);
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error(`Failed to serialize: ${errorMessage}`);
    }
  }
  
  return assertType(parsed, guard, errorMessage);
}

/**
 * Validates that a value is a valid array length (non-negative integer)
 */
export function isValidArrayLength(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * Validates that a value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * Validates that a value is a non-negative number
 */
export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}

