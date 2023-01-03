import InitialObject from "../../interfaces/initialObject";
import ObjectService from "./ObjectHandler.service";
import ClippedObject from "../../interfaces/clippedObject";
import Togglable from "../../interfaces/togglable";
import ElementRole from "../../utils/enums/elementRole";
import { isValidTogglable } from "../../utils/helpers/validation";
import { Child } from "../../interfaces/child";
import { Trigger } from "../../interfaces/trigger";
import SearchElement from "../../interfaces/searchable";

class ObjectHandler {
  private serv = new ObjectService();

  public build(objects: InitialObject[]): Togglable[] {
    const objectArray: Togglable[] = [];

    for (let object of objects) {
      const parentSearchable = this.serv.buildSearchable<InitialObject>(object);
      const triggerSearchable = this.serv.buildSearchable<Trigger>(
        object.trigger,
        ElementRole.TRIGGER
      );

      if (object.classes) {
        const togglable = this.getParent(object, parentSearchable);
        if (isValidTogglable(togglable)) objectArray.push(togglable);
        else throw new Error("Parent object is invalid");
      }

      if (object.trigger.classes) {
        const togglable = this.getTrigger(object.trigger, triggerSearchable);
        if (isValidTogglable(togglable)) objectArray.push(togglable);
        else throw new Error("Trigger object is invalid");
      }

      if (!object.children) continue;

      for (let childObj of object.children) {
        if (!childObj.classes) continue;
        const childSearchable = this.serv.buildSearchable<Child>(childObj);

        const togglable = this.getChild(
          childObj,
          object.trigger,
          childSearchable,
          parentSearchable
        );

        if (isValidTogglable(togglable)) objectArray.push(togglable);
        else throw new Error("Child object is invalid");
      }
    }

    return objectArray;
  }

  private getParent(object: InitialObject, parent: SearchElement): Togglable {
    try {
      const { classes, trigger } = object;

      const element = {
        element: this.serv.getElementArray(parent),
        classes: this.serv.getClasses(classes, ElementRole.PARENT),
        event: {
          type: this.serv.getEventType(trigger.event),
          button: this.serv.getButton(object.trigger),
        },
      } as Togglable;

      return element;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
      throw new Error("Something went wrong in parent parser function");
    }
  }

  private getChild(
    childObject: Child,
    trigger: Trigger,
    child: SearchElement,
    parent?: SearchElement
  ): Togglable {
    try {
      const { classes } = childObject;

      const element = {
        element: this.serv.getElementArray(parent!, child),
        classes: this.serv.getClasses(classes, ElementRole.CHILD),
        event: {
          type: this.serv.getEventType(trigger.event),
          button: this.serv.getButton(trigger),
        },
      } as Togglable;

      return element;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
      throw new Error("Something went wrong in parent parser function");
    }
  }
  private getTrigger(triggerObj: Trigger, trigger: SearchElement): Togglable {
    try {
      const { classes, event } = triggerObj;

      const element = {
        element: this.serv.getElementArray(trigger),
        classes: this.serv.getClasses(classes),
        event: {
          type: this.serv.getEventType(event),
          button: this.serv.getButton(triggerObj),
        },
      } as Togglable;

      return element;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
      throw new Error("Something went wrong in parent parser function");
    }
  }

  public cutObject<T extends ClippedObject>(el: T): ClippedObject {
    try {
      return {
        element: el.element,
        classes: el.classes,
      };
    } catch (error) {
      throw new Error("Cannot cut that object!");
    }
  }
}

export default ObjectHandler;
