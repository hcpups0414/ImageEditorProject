import React from 'react';

const ImageContainer = (props) => {
  return (
    <div className="imageContainer">
      <div className="bar">
        <div className="dot"></div>
      </div>
      { props.children }
    </div>
  );
}
 
export default ImageContainer;