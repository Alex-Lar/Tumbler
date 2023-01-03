import Searchable from "../../interfaces/searchable";
import * as filter from "./filters";
import { isClass } from "./validation";

export const getParentArray = (parent: Searchable): HTMLElement[] => {
  const { id, tag, includes, excludes } = parent;
  let array: HTMLElement[] = [];

  if (id && !isClass(id)) {
    let element = document.getElementById(id.substring(1)) as HTMLElement;
    array.push(element);
  }

  if (!array.length && id && isClass(id)) {
    let collection = document.getElementsByClassName(
      id.substring(1)
    ) as HTMLCollectionOf<HTMLElement>;

    if (tag)
      array = [...collection].filter((el) => el.tagName === tag?.toUpperCase());
    if (!array.length && tag)
      throw new Error("Element with the corresponding tag is missing!");
  }

  if (!array.length && tag) {
    let collection = document.getElementsByTagName(
      tag
    ) as HTMLCollectionOf<HTMLElement>;

    array = [...collection];
  }

  if ((id && isClass(id)) || (!id && tag)) {
    if (array.length && includes.length)
      array = filter.byIncludes(array, includes);
    if (array.length && excludes.length && !includes.length)
      array = filter.byExcludes(array, excludes);
  }

  return array;
};

export const getChildById = (id: string): HTMLElement[] => {
  const array: HTMLElement[] = [];
  let element = document.getElementById(id) as HTMLElement;
  array.push(element);
  return array;
};

export const getChildrenByParent = (
  parentArray: HTMLElement[],
  child: Searchable
): HTMLElement[] => {
  const { id, tag, includes, excludes } = child;
  let children: HTMLElement[] = [];

  if (id)
    for (let parent of parentArray) {
      let collection = parent.getElementsByClassName(
        id.substring(1)
      ) as HTMLCollectionOf<HTMLElement>;

      if (tag) {
        let array = [...collection].filter(
          (el) => el.tagName === tag?.toUpperCase()
        );

        for (let el of array) {
          children.push(el);
        }

        if (!array.length)
          throw new Error("Element with the corresponding tag is missing!");
      }

      if (!tag)
        for (let el of [...collection]) {
          children.push(el);
        }
    }

  if (!children.length && tag)
    for (let parent of parentArray) {
      let collection = parent.getElementsByTagName(
        tag
      ) as HTMLCollectionOf<HTMLElement>;

      for (let el of [...collection]) {
        children.push(el);
      }
    }

  if (children.length && includes.length)
    children = filter.byIncludes(children, includes);
  if (children.length && excludes.length && !includes.length)
    children = filter.byExcludes(children, excludes);

  return children;
};
