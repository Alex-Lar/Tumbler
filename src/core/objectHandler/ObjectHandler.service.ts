import { Child } from "../../interfaces/child";
import Searchable from "../../interfaces/searchable";
import { Trigger } from "../../interfaces/trigger";
import { Class } from "../../interfaces/types/class";
import Role from "../../interfaces/types/role";
import Tag from "../../interfaces/types/tag";
import { InitialObject } from "../../types";
import ElementRole from "../../utils/enums/elementRole";
import {
  getChildById,
  getChildrenByParent,
  getParentArray,
} from "../../utils/helpers/search";
import * as filter from "../../utils/helpers/filters";
import { isClass, isValidButtonArray } from "../../utils/helpers/validation";

class ObjectService {
  public getElementArray = (
    parent: Searchable,
    child?: Searchable
  ): HTMLElement[] => {
    try {
      let array: HTMLElement[] = [];

      if (child && child.id && !isClass(child.id)) {
        const { id } = child;
        return getChildById(id.substring(1));
      }

      array = getParentArray(parent);

      if (child && array.length) {
        return getChildrenByParent(array, child);
      }

      if (array) return array;

      throw new Error("Cannot get an array of elements!");
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message) 
      throw new Error("When trying to get an array of elements, an error occurred!");
    }
  };

  public getButton = (trigger: Trigger): HTMLElement => {
    const { id, tag, includes } = trigger;
    let array: HTMLElement[] = [];

    if (id && !isClass(id)) {
      return document.getElementById(id.substring(1)) as HTMLElement;
    }

    if (id && isClass(id)) {
      const collection = document.getElementsByClassName(
        id.substring(1)
      ) as HTMLCollectionOf<HTMLElement>;

      if (tag) {
        array = [...collection].filter(
          (el) => el.tagName === tag?.toUpperCase()
        );
      }

      if (!array.length) {
        throw new Error("Element with the corresponding tag is missing!");
      }
    }

    if (!array.length && tag) {
      const collection = document.getElementsByTagName(
        tag
      ) as HTMLCollectionOf<HTMLElement>;

      array = [...collection];
    }

    if (array.length && includes) array = filter.byIncludes(array, includes);

    if (array.length && isValidButtonArray(array)) {
      const [element] = array;
      return element;
    }

    throw new Error("Event trigger button is missing!");
  };

  public getClasses = (classes: Class, role?: Role): Class | null => {
    try {
      if (!classes && role === ElementRole.PARENT) return null;
      if (!classes && role === ElementRole.CHILD) {
        throw new Error("Children are required to contain classes");
      }

      return classes;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error("Cannot build classes");
      }
    }
  };

  public getEventType = (type: string): string => {
    try {
      if (!type) {
        throw new Error("Event type is missing!");
      }

      return type;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error("Cannot get event type");
      }
    }
  };

  public buildSearchable<T extends InitialObject | Child | Trigger>(
    obj: T,
    role?: Role
  ): Searchable {
    if (!obj.id && !obj.tag) throw new Error("Element has no ID and tag name!");
    const isTrigger = role === ElementRole.TRIGGER;

    return {
      id: obj.id,
      tag: obj.tag || null,
      includes: obj.includes || [],
      excludes: isTrigger ? [] : obj.excludes || [],
    } as Searchable;
  }
}

export default ObjectService;
