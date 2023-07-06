import {makeScene2D, Circle, Txt, Rect, Layout} from '@motion-canvas/2d';
import {all, createRef, textLerp} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  const circle = createRef<Circle>();
  view.add(
    <>
      <Circle
        ref={circle}
        size={100}
        fill={'#ffffff'}
        opacity={0}
      />
    </>


  );

  yield * all(
    circle().opacity(1, 2),
    circle().size(200, 2),
  )
});
