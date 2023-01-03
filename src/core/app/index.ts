import InitialObject from "../../interfaces/initialObject";
import { isValidInputObject } from "../../utils/helpers/validation";
import ObjectHandler from "../objectHandler/ObjectHandler";
import Switch from "../switch/Switch";

class App {
  private objects: InitialObject[];
  private objHandler = new ObjectHandler();

  constructor(objects: InitialObject[]) {
    this.objects = objects;
    this.launch();
  }

  private launch(): void {
    try {
      for (let object of this.objects) {
        if (!isValidInputObject(object)) {
          throw new Error();
        }
      }
  
      const togglables = this.objHandler.build(this.objects);
  
      for (let togglable of togglables) {
        new Switch(togglable);
      }

    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
      console.log("Something went wrong in application...");
    }
  }
}

export default App;