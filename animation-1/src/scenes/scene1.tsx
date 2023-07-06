import {
  Circle,
  Grid,
  Rect,
  Line,
  Node,
  Layout,
  Txt,
} from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { Vector2, createRef } from '@motion-canvas/core';
import {all, delay, waitFor, waitUntil} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
import {linear, easeInOutBounce} from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
  
  const box1 = createRef<Rect>();
  const box2 = createRef<Rect>();
  view.add(
    <>
      <Rect 
        ref={box1}
        size={250}
        opacity={.0}
        fill={'#3bfcf1'}
        stroke={'#000000'}
        lineWidth={8}
        radius={20}
        children={
          <Txt
            text={'4 kg'}
            fontSize={75}
            fontWeight={750}
          />
        }
      />

      <Rect
        y={-800} 
        ref={box2}
        size={200}
        opacity={1}
        fill={'#3bfcf1'}
        stroke={'#000000'}
        lineWidth={8}
        radius={20}
        children={
          <Txt
            text={'3 kg'}
            fontSize={60}
            fontWeight={750}
          />
        }
      />
    </>
  );

  yield * box1().opacity(1, 2);
  yield * waitUntil('add box2');
  yield * box2().y(-225, 2);
  box2().bottom(box1().top());

  const txt = createRef<Txt>();
  view.add(
    <Txt
      ref={txt}
      text={'Total mass = 7 kg'}
      fontSize={60}
      fontWeight={750}
      y={300}
      opacity={0.0}
      fill={'#ffffff'}
    />
  );

  yield * txt().opacity(1, 2);
});