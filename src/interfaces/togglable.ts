import { Class } from "./types/class";
import { TriggerEvent } from "./trigger";

interface Togglable {
  readonly element: HTMLElement[];
  readonly classes: Class;
  readonly event: TriggerEvent;
}

export default Togglable;