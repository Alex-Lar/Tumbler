import Togglable from "../../interfaces/togglable";
import Quantity from "../../utils/enums/quantity";
import EventHandler from "../eventHandler/EventHandler";

class Switch {
  private togglable: Togglable;
  private EventHandler = new EventHandler();

  constructor(togglable: Togglable) {
    this.togglable = togglable;
    this.classSwitch();
  }

  private getToggleFn = (el: HTMLElement): (() => void) => {
    const { classes } = this.togglable;

    if (classes && classes.length === Quantity.ONE) {
      return (): void => {
        const [classOne] = classes;
        el.classList.toggle(classOne);
      };
    }

    if (classes && classes.length === Quantity.TWO) {
      return (): void => {
        const [ classOne, classTwo ] = classes;
        el.classList.toggle(classOne);
        el.classList.toggle(classTwo!);
      };
    }

    throw new Error("Class could not be found...");
  };

  private classSwitch(): void {
    const { button, type } = this.togglable.event;

    for (let el of this.togglable.element) {
      const fn = this.getToggleFn(el);

      this.EventHandler.listen(button, type, fn);
    }
  }
}

export default Switch;
