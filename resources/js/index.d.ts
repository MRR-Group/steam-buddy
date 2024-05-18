declare global {
    interface Window {
      __routeSpy: Mock<any[], string>;
      __routeCurrentSpy: Mock<[], boolean>;
      route: (...args: any[]) => string;
    }
  }