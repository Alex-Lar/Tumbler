import Identifier from "./types/identifier";
import Tag from "./types/tag";
import { Class } from "./types/class";

// InputChild
interface Child {
  id?: Identifier;
  tag?: Tag;
  includes?: number[];
  excludes?: number[];
  classes: Class;
}

export { Child };