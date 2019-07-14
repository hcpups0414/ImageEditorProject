import React, {useEffect} from 'react';
import withFile from 'hoc/withFile';
import withUploadImage from 'hoc/withUploadImage';
import {ReactComponent as ImageIcon} from 'assets/images/icons/image.svg';

const ImageDropZone = (props) => {
  const {acceptedFiles, getRootProps, getInputProps, isDragActive, file} = props;
  useEffect(() => {
    if(acceptedFiles.length > 0){
      file.setImage(acceptedFiles);
    }
  });
  return (
    !file.image ?
      <div className="dropZone" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="info">
          <ImageIcon/>
          {
            isDragActive ?
              <p>Move to here</p> :
              <p>Uploadk Image</p>
          }
        </div>
      </div> :
      null
  );
}
 
export default withFile(withUploadImage(ImageDropZone));
