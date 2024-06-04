import { afterAll, beforeAll, beforeEach, describe, expect, it, vitest } from "vitest";
import { MockTimeline, mockTimeline } from "./GsapTimelineMock";
import { animation } from "./Animation";

describe('Animation', () => {
  let tl: MockTimeline

  beforeAll(() => {
    tl = mockTimeline();
  });

  beforeEach(() => {
    tl.mockClear();
  });

  afterAll(() => {
    tl.mockRestore();
  });

  it(`should generate simple animation`, () => {
    const result = animation((tl, item) => {
      tl
        .set(item, { rotationX: 200 })
    });

    const div = document.createElement('div');

    result(div, () => {});
    expect(div).toHaveStyle(`transform: rotateX(200deg)`);
  });

  describe(`animation function`, () => {
    it('should return function that calls onDone when animation is finished', () => {
      const onDone = vitest.fn();
      const result = animation(() => {})(null, onDone);
  
      result();
  
      expect(onDone).toHaveBeenCalled();
    });
  
    it(`should run complex animation`, () => {
      const onDone = vitest.fn();
      const div = document.createElement('div');
  
      const runAnimation = animation((tl, item: HTMLDivElement | null) => {
        tl.to(item, { scale: 0.75, duration: 0.125 });
        tl.to(item, { scale: 1.25, duration: 0.25 });
        tl.to(item, { scale: 1.5, duration: 0.25 });
      });
  
      runAnimation(div, onDone);
  
      expect(div).toHaveStyle("transform: scale(1.5)");
      expect(onDone).toBeCalled();
    });

    it(`should return cleanup function`, () => {
      const result = animation(() => {})(null, () => {});
    
      expect(result).toBeInstanceOf(Function);
    });
  });
});