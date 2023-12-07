import { parsePhoneNumber } from 'awesome-phonenumber';
import secureRandom = require('random-number-csprng');

/**
 * Fisher-Yates Shuffle.
 * Warning: Array input will be restructured randomly
 */
export const shuffle = <T = any>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temp = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = temp;
  }

  return array;
};

export const getSecureRandomNumber = (min: number, max: number) => {
  return secureRandom(min, max);
};

/**
 * Generate random number in range, inclusive min, exclusive max
 */
export function genRandomNumber(min: number, max: number, isDecimal?: boolean) {
  let result = Math.random() * (max - min) + min;
  if (!isDecimal) result = Math.floor(result);
  return result;
}

export function getCurrentUnixTimestamp(date?: Date) {
  if (date) {
    return Math.floor(date.valueOf() / 1000);
  } else {
    return Math.floor(Date.now() / 1000);
  }
}

/**
 * @param amount amount number to generate
 * @param min lower limit
 * @param max upper limit
 * @returns list of random unique numbers
 */
export function genListUniqueRandomNumber(
  amount: number,
  min: number,
  max: number,
) {
  const result = new Set<number>();

  while (result.size < amount) {
    const randomNumb = genRandomNumber(min, max, false);
    result.add(randomNumb);
  }

  return result;
}

export const camelToSnakeCase = (str: string) => {
  return (
    str[0].toLowerCase() +
    str.slice(1).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  );
};

export function isNullOrUndefined(obj: any) {
  if (typeof obj === 'undefined' || obj === null) return true;
  return false;
}

export function getPhoneE164(
  phone: string,
  regionCode = 'VN',
): string | undefined {
  const phoneNumber = parsePhoneNumber(phone, { regionCode });

  return phoneNumber.possible ? phoneNumber.number.e164 : undefined;
}

/**
 * Synchronize sortArr's order to originArr's order in-place
 */
export function syncArrayPos(
  originArr: object[],
  sortArr: object[],
  field = 'id',
) {
  sortArr.sort((a, b) =>
    originArr.findIndex((item) => item[field] === a[field]) <
    originArr.findIndex((item) => item[field] === b[field])
      ? -1
      : 1,
  );
}

// Split array to smaller arrays
// Exp: [1,2,3,4] => [ [1,2] , [3,4] ]
export function chunk<T = any>(input: T[], size: number): T[][] {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
}

export function tryParseJson(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return json;
  }
}

export function randomEnum<T>(_enum: T): T[keyof T] {
  const enumValues = Object.values(_enum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}
