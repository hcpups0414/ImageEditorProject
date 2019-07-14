import React, {useEffect, useState, useRef} from 'react';
import { Stage, Layer} from 'react-konva';
import withFile from 'hoc/withFile';
import withCropbox from 'hoc/withCropbox';

import Cropbox from 'components/image/Cropbox';
import UploadedImage from 'components/image/UploadedImage';

const getImageData = (newFile, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    let img = new Image();
    img.src = e.target.result;
    img.onload = function(){
      callback({
        src: img.src,
        width: img.width,
        height: img.height,
      });
    };
  };
  fileReader.readAsDataURL(newFile);
};

const addCropbox = (cropBox) => {
  cropBox.setCropBox([...cropBox.cropBox,{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    deleted: false
  }]);
}

const ImageCanvas = (props) => {
  const { file, cropBox } = props;
  const stageRef = useRef();
  const layerRef = useRef();
  const [imageData, setImageData] = useState(null);
  const prev = useRef();
  const [isCreateCrop, setIsCreateCrop] = useState(true);
  
  useEffect(()=> {
    if(file.image && prev.current !== file.image){
      getImageData(file.image[0], (data) => {
        setImageData(data);
        prev.current = file.image;
      });
    }
  });
  return (
    <div className="editor">
      {
        imageData &&
        <Stage ref={stageRef} width={393} height={792}>
          <Layer ref={layerRef}>
            <UploadedImage
              imageData={imageData}
              cropBox={cropBox}
              onMouseDown={e => {
                setIsCreateCrop(true);
              }}
              onMouseUp={e => {
                if(isCreateCrop){
                  addCropbox(cropBox);
                  setIsCreateCrop(false);
                }
              }}
            />
            {
              cropBox.cropBox.length > 0 &&
              cropBox.cropBox.map((box, index) => (
                box.deleted 
                  ? null
                  : <Cropbox
                      index={index}
                      key={index}
                      x={box.x}
                      y={box.y}
                      width={box.width}
                      height={box.height}
                      cropBox={cropBox}
                    /> 
              ))
            }
          </Layer>
        </Stage>
      }
    </div>
  );
}
 
export default withCropbox(withFile(ImageCanvas));