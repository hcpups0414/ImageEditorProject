import React from 'react';
import withCropbox from 'hoc/withCropbox';
const Coordinate = (props) => {
  const { cropBox } = props;
  return (
    <div className="coordinate">
      {
        cropBox.cropBox.length > 0 && 
        <pre>
          {
            JSON.stringify(
              cropBox.cropBox
                .filter((box)=> !box.deleted)
                .map((box) => ({
                  x: box.x,
                  y: box.y,
                  width: box.width,
                  height: box.height
                }))
            , null, 2)
          }
        </pre>
      }
    </div>
  );
}
 
export default withCropbox(Coordinate);
