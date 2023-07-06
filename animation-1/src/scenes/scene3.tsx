import {
  Circle,
  Grid,
  Line,
  Node,
  Txt,
} from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { DEG2RAD, Vector2, createRef, debug } from '@motion-canvas/core';
import {all, sequence, waitFor, waitUntil} from '@motion-canvas/core/lib/flow';
import {createSignal} from '@motion-canvas/core/lib/signals';
import {linear} from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
  //#fc3b46

  //-------------------Part 1-------------------//

  const backgroundPlane = createRef<Node>();
  const introText = createRef<Txt>();
  const exampleVector = createRef<Line>();
  const grid = createRef<Grid>();
  const exampleEndPoint = createSignal(new Vector2(400, 0));

  view.add(
    <>

    // Intro Text
      <Txt
        ref={introText}
        text={'Vectors : Introduction'}
        fontFamily={'montserrat'}
        fontSize={130}
        stroke={'#ffffff'}
        fill={'#3bfcf1'}
        opacity={1}
        scale={1}
        x={0}
        y={0}
      />

      // Grid
      <Node ref={backgroundPlane} scale={0}>
        {/* Grid and animated point */}
        <Grid 
          ref={grid}
          size={new Vector2(2000, 1200)} 
          stroke={'#444'} 
          lineWidth={3} 
          spacing={100}>
        </Grid>

        {/* Vertical */}
        <Node position={[0, 0]}>
          {/* Axis */}
          <Line
            lineWidth={4}
            points={[
              [0, 500],
              [0, -500],
            ]}
            stroke={'#DDD'}
            lineCap={'round'}
            startArrow
            endArrow
            arrowSize={15}
          >
            <Txt
              fill={'#DDD'}
              text={'Y'}
              fontWeight={300}
              fontSize={50}
              x={-60}
              y={-460}
            />
          </Line>
        </Node>

        {/* Horizontal */}
        <Node position={[0, 0]}>
          {/* Axis */}
          <Line
            lineWidth={4}
            points={[
              [900, 0],
              [-900, 0],
            ]}
            stroke={'#DDD'}
            lineCap={'round'}
            startArrow
            endArrow
            arrowSize={15}
          >
            <Txt
              fill={'#DDD'}
              text={'X'}
              fontWeight={300}
              fontSize={50}
              x={860}
              y={60}
            />
          </Line>
        </Node>
      </Node>,


      // Example Vector
      <Line
        ref={exampleVector}
        points={[new Vector2(0, 0), ()=>exampleEndPoint()]}
        stroke={'#ffffff'}
        opacity={0}
        scale={0}
        lineWidth={10}
        endArrow
        x={-200}
        children={
          <Txt
            text={()=>`${exampleEndPoint().scale(0.01).magnitude.toFixed(2)}`}
            fontFamily={'montserrat'}
            fontSize={50}
            fontWeight={55}
            fontStyle={'bold'}
            stroke={'#ffffff'}
            fill={'#3bfcf1'}
            opacity={0}
            bottom={()=>exampleEndPoint().scale(0.5)}
            paddingBottom={6}
            rotation={()=> {
              let angle = Math.atan2(exampleEndPoint().y, exampleEndPoint().x);
              return angle * 180 / Math.PI;
            }}
          
          />
        }
      />
    </>
  );


  yield * waitUntil('start');
  yield * all(
    introText().y(-200, 1),
    exampleVector().opacity(1, 1),
    exampleVector().scale(1, 1),
  )

  yield * waitUntil('grid');
  yield * introText().opacity(0, 1.5);
  yield * all(
    backgroundPlane().scale(1, 2),
    exampleVector().stroke('3bfcf1', 1),
    exampleVector().x(0, 2),
    exampleVector().y(0, 2),
    exampleVector().rotation(-45, 2)
  )
 
  //yield * waitUntil('tilt')
  //yield * exampleVector().rotation(-180, 6).to(-45, 2)

  exampleVector().rotation(0)
  exampleEndPoint(new Vector2(Math.SQRT2*200, -Math.SQRT2*200))
  yield * waitUntil('mag')

  yield * exampleVector().children()[0].opacity(1, 1)
  yield * exampleEndPoint(exampleEndPoint().scale(0.5), 2)
          .to(exampleEndPoint().scale(1.5), 2)
          .to(exampleEndPoint().scale(1), 2)

  yield * waitUntil('tilt')
  yield * exampleVector().rotation(-90, 3).to(0, 2)

  yield * waitUntil('move')

  yield * exampleVector().x(200, 2)
  yield * exampleVector().y(-100, 2)
  yield * exampleVector().x(-500, 2)
  yield * exampleVector().y(400, 2) 
  yield * all(
    exampleVector().x(0, 2),
    exampleVector().y(0, 2),
  ) 

  yield * waitUntil('part2')



  //-------------------Part 2-------------------//
  const angle = createSignal(0);
  const ball = createRef<Circle>();
  
  const vec1 = createRef<Line>();
  const vec2 = createRef<Line>();
  const resultant = createRef<Line>();
  
  const endPoint = createSignal(() => {
    let x = 4 - (3 * Math.cos(angle() * DEG2RAD))
    let y = 3 * Math.sin(angle() * DEG2RAD)
    return new Vector2(x*100, -y*100);
  });

  const resLen = createSignal(()=>endPoint().magnitude/100);

  view.add(
    <>
      <Circle
        ref={ball}
        size={300}
        scale={0}
        fill={'#3bfcf1'}
        stroke={'#000000'}
        lineWidth={6}
        opacity={0}
        rotation={() => angle()}
      />

      // Vector 1
      <Line
        ref={vec1}
        points={[new Vector2(0, 0), new Vector2(400, 0)]}
        stroke={'#A7FC3B'}
        opacity={0}
        scale={0}
        lineWidth={10}
        endArrow
        x={-550}
        children={
          <Txt
            text={'4.0 N'}
            fontFamily={'montserrat'}
            fontSize={45}
            stroke={'#ffffff'}
            fill={'#A7FC3B'}
            x={200}
            offsetY={1.2}  
          />
        }
      />

      // Vector 2
      <Line
        ref={vec2}
        points={[new Vector2(0, 0), new Vector2(-300, 0)]}
        stroke={'#b67dfd'}
        opacity={0}
        scale={0}
        lineWidth={10}
        endArrow
        left={ball().right}
        padding={300}
        rotation={() => angle()}
        children={
          <>
          <Txt
            text={'3.0 N'}
            fontFamily={'montserrat'}
            fontSize={45}
            stroke={'#ffffff'}
            fill={'#b67dfd'}
            rotation={()=>{
              if(angle() > 90 && angle() < 270) return 180
              else return 0
            }}
            x={-150}
            offsetY={-1.5}
          />
          </>
        }
      />

      // Resultant Vector
      <Line
        ref={resultant}
        points={[new Vector2(0, 0), () => endPoint()]}
        stroke={'#fc3b46'}
        opacity={0}
        scale={0}
        lineWidth={11}
        endArrow
        children={
          <Txt
            text={()=>`${resLen().toFixed(2)} N`}
            fontFamily={'montserrat'}
            fontSize={45}
            fontStyle={'bold'}
            stroke={'#ffffff'}
            fill={'#fc3b46'}
            opacity={1}
            bottom={()=>endPoint().scale(0.5)}
            paddingBottom={6}
            rotation={()=> {
              let angle = Math.atan2(endPoint().y, endPoint().x);
              return angle * 180 / Math.PI;
            }}
          
          />
        }
      />
    </>
  );
  
  yield * all(
    backgroundPlane().scale(0, 1),
    exampleVector().opacity(0, 1),
    exampleVector().scale(0, 1),
    ball().opacity(1, 2),
    ball().scale(1, 2),
  )

  yield * waitUntil('v1');

  yield * all(
    vec1().opacity(1, 2),
    vec1().scale(1, 2),
  )

  yield * waitUntil('v2');
  
  yield * all(
    vec2().opacity(1, 2),
    vec2().scale(1, 2),
  )

  yield * waitUntil('v3');

  yield * all(
    resultant().opacity(1, 2),
    resultant().scale(1, 2),
  )

  yield * waitUntil('rotate');

  yield * angle(180, 10, linear);
  yield * waitUntil('90deg');
  yield * angle(90, 2);
  yield * waitUntil('rearr');
  
  yield * all(
    ball().opacity(0, 2),
    vec1().x(-screen.width/2, 4), vec1().y(0, 4),
    vec2().x(0, 4), vec2().y(150, 4),
    resultant().x(screen.width/4, 4), resultant().y(-endPoint().y/2, 4),
  )

  
  const symbols = createRef<Node>();

  view.add(
    <>
    <Node ref={symbols} opacity={0}>
      <Txt
        text={'+'}
        fontFamily={'montserrat'}
        fontSize={100}
        fontWeight={750}
        stroke={'#ffffff'}
        fill={'#3bfcf1'}
        x={-220}
        y={0}
      />

      <Txt
        text={'='}
        fontFamily={'montserrat'}
        fontSize={100}
        fontWeight={750}
        stroke={'#ffffff'}
        fill={'#3bfcf1'}
        x={220}
        y={0}
      />
    </Node>
    </>
  )

  yield * symbols().opacity(1, 1)
  yield * waitUntil('symbols');
  yield * symbols().opacity(0, 2)

  backgroundPlane().scale(1)
  backgroundPlane().opacity(0)

  yield * all(
    backgroundPlane().opacity(1, 2),
    vec1().x(0, 4), vec1().y(0 , 4),
    vec2().x(400, 4), vec2().y(0, 4),
  )
  yield * waitFor(2)
  yield * all(
    resultant().x(0, 4), resultant().y(0, 4),
  )

  yield * waitUntil('rot');
  yield * all(
    angle(0, 2),
  )
  yield * waitUntil('rot2');
  yield * angle(180, 8, linear);
  yield * waitUntil('rot3');
  yield * angle(450, 2);
  yield * waitUntil('end');
});