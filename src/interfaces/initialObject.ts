import Identifier from "./types/identifier";
import Tag from "./types/tag";
import { Class } from "./types/class";
import { Child } from "./child";
import { Trigger } from "./trigger";

interface InitialObject {
  id?: Identifier;
  tag?: Tag;
  classes?: Class;
  includes?: number[];
  excludes?: number[];
  children?: Child[];
  trigger: Trigger;
}

export default InitialObject;