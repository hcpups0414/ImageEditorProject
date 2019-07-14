import React, {useRef, useEffect, useState} from 'react';
import { Rect, Text, Transformer } from 'react-konva';

const Cropbox = (props) => {
  const { index, x, y, width, height, cropBox } = props;
  const cropRef = useRef();
  const transformerRef = useRef();
  const [isStop, setIsStop] = useState(true);

  useEffect(() => {
    transformerRef.current.setNode(cropRef.current);
    transformerRef.current.getLayer().batchDraw();
  });
  return (
    <React.Fragment>
      <Rect
        ref={cropRef}
        x={x}
        y={y}
        name={`crop`}
        width={width}
        height={height}
        fill={'rgba(255, 255, 255, 0)'}
        draggable
        onDragStart={(e) => {
          setIsStop(false);
        }}
        onDragEnd={e => {
          setIsStop(true);
          const after = [...cropBox.cropBox];
          after[index] = {
            x: e.target.x(),
            y: e.target.y(),
            width: e.target.width(),
            height: e.target.height(),
            deleted: false
          };
          cropBox.setCropBox(after);
        }}
        onTransformStart={()=>{
          setIsStop(false);
        }}
        onTransformEnd={()=>{
          setIsStop(true);
          const node = cropRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // need reset scale
          node.scaleX(1);
          node.scaleY(1);
          const after = [...cropBox.cropBox];
          after[index] = {
            x: node.x(),
            y: node.y(),
            width: Math.abs(node.width() * scaleX),
            height: Math.abs(node.height() * scaleY),
            deleted: false,
          };
          cropBox.setCropBox(after);
        }}
      />
      {
        isStop &&
        <Text
          x={cropBox.cropBox[index].x + cropBox.cropBox[index].width + 10}
          y={cropBox.cropBox[index].y}
          text="X"
          fill="white"
          width={20}
          height={20}
          onClick={() => {
            const after = [...cropBox.cropBox];
            after[index] = {
              ...after[index],
              deleted: true,
            };
            cropBox.setCropBox(after);
          }}
        />
      }
      <Transformer ref={transformerRef} rotateEnabled={false}/>
    </React.Fragment>
  );
}
 
export default Cropbox;