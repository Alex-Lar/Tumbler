class EventHandler {
  public listen(btn: HTMLElement, eventType: string, fn: () => void) {
    btn.addEventListener(eventType, () => {
      try {
        fn();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Event listener error!");
        }
      }
    });
  }
}

export default EventHandler;
