import React from 'react';
import {useDropzone} from 'react-dropzone'

const withUploadImage = (Component) => (props) => {
  
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone();

  return (
    <Component
      {...props}
      acceptedFiles={acceptedFiles}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
    />
  );
}
 
export default withUploadImage;