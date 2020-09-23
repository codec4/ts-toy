import { defaultCompare, DOES_NOT_EXIST, ICompareFunction, Compare } from '../../util';

export function jumpSearch<T>(array: T[], value: T, compareFn: ICompareFunction<T> = defaultCompare) {
  const { length } = array;
  const { floor, sqrt, min } = Math;

  let previous = 0;
  let step = floor(sqrt(length));

  while (compareFn(array[min(step, length) - 1], value) === Compare.LESS_THAN && previous < step) {
    previous = step;
    step += floor(sqrt(length));

    if (previous >= length) {
      return DOES_NOT_EXIST;
    }
  }

  for (let i = previous; i < step; i++) {
    if (compareFn(array[i], value) === Compare.EQUALS) {
      return i;
    }
  }

  return DOES_NOT_EXIST;
}
