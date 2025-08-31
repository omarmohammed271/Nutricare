/*
 * Copyright (c) 2023.
 * File Name: global.ts
 * Author: Coderthemes
 */

export const deepMergeObjects = <T>(list: T[]): T => {
  let object: T = {} as T;
  list.forEach((l) => {
    object = {
      ...object,
      ...l,
    };
  });
  return object;
};
