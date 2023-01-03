import Togglable from "../../interfaces/togglable";
import Identifier from "../../interfaces/types/identifier";
import { InitialObject } from "../../types";
import Quantity from "../enums/quantity";

export const isElement = (el: HTMLElement): boolean => {
  return true;
};

export const isElementArray = (el: HTMLElement[]): boolean => {
  return true;
};

export const isValidButtonArray = (buttons: HTMLElement[]): boolean => {
  if (buttons.length !== Quantity.ONE) return false;
  return true;
}

export const isValidTogglable = (obj: Togglable): boolean => {

  return true;
}

export const isValidInputObject = (obj: InitialObject): boolean => {
  if (!obj.id && !obj.tag) return false;
  if (!obj.classes && !obj.children) return false;

  if (obj.children)
    for (let child of obj.children) {
      if ((!child.id && !child.tag) || !child.classes) return false;
    }

  return true;
};

export const isClass = (id?: Identifier): boolean => {
  if (id && id.charAt(0) === ".") return true;
  return false;
};