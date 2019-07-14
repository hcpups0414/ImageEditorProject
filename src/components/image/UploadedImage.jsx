import React, {useRef} from 'react';
import { Image, Rect } from 'react-konva';
import useImage from 'use-image';

const UploadedImage = (props) => {
  const { imageData, onMouseDown, onMouseUp, cropBox } = props;
  const scale = 393 / imageData.width;
  const [image] = useImage(imageData.src);
  const imageRef = useRef();
  return (
    <React.Fragment>
      <Image 
        ref={imageRef}
        image={image} 
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        width={imageData.width * scale} 
        height={imageData.height * scale}
      />
      {
        cropBox.cropBox.length > 0 &&
        cropBox.cropBox.map((box, index) => (
          box.deleted ?
            <Rect
              key={index}
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              globalCompositeOperation='destination-out'
              fill={'rgba(255, 255, 255)'}
            /> :
            null
        ))
      }
    </React.Fragment>
  );
};
export default UploadedImage;