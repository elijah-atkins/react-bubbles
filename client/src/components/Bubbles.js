import React, { useState, useEffect, useRef } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";
import useResize from '../hooks/useResize';

const Bubbles = ({ colors }) => {
  const componentRef = useRef();
  const { width, height } = useResize(componentRef);
  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    console.log(`Width: ${width}, Height: ${height}`)
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)),
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors, width, height]);

  return (
    <div ref={componentRef} className="bubble-wrap">
      <legend>bubbles</legend>
      <Svg  width={width} height={height}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[width, height]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (

                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
 
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
