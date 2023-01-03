export const byIncludes = (
  array: HTMLElement[],
  includes?: number[]
): HTMLElement[] => {
  if (!includes || !includes.length) return array;
  includes = [...includes];
  let filtered: HTMLElement[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < includes.length; j++) {
      if (includes[j] === i) {
        filtered.push(array[i]);
        includes = includes.filter((el, i) => i !== j);
        break;
      }
    }

    if (!includes.length) break;
  }

  return filtered;
};

export const byExcludes = (
  array: HTMLElement[],
  excludes?: number[]
): HTMLElement[] => {
  if (!excludes || !excludes.length) return array;
  excludes = [...excludes];
  let filtered: HTMLElement[] = [];

  for (let i = 0; i < array.length; i++) {
    let j = 0;

    do {
      if (excludes.length && excludes[j] === i) {
        excludes = excludes.filter((el, i) => i !== j);
        j--;
        break;
      }

      if (!excludes.length) filtered.push(array[i]);
      j++;
    } while (j < excludes.length);

    if (j === excludes.length) filtered.push(array[i]);
  }

  return filtered;
};

