import Identifier from "./types/identifier";
import { Class } from "./types/class";
import Tag from "./types/tag";

interface Trigger {
  id?: Identifier;
  tag?: Tag;
  includes?: number[];
  excludes?: number[];
  event: string; 
  classes?: Class;
}

interface TriggerEvent {
  readonly button: HTMLElement;
  readonly type: string;
}

export { Trigger, TriggerEvent };
