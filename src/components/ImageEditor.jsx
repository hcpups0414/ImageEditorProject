import React, {useState} from 'react';
import ImageContainer from 'components/image/ImageContainer';
import ImageDropZone from 'components/image/ImageDropZone';
import ImageCanvas from 'components/image/ImageCanvas';
import Coordinate from 'components/coordinate/Coordinate';
import { Provider as CropboxProvider } from 'contexts/cropboxContext';
import { Provider as FileProvider } from 'contexts/fileContext';
import 'assets/scss/ImageEditor.scss';
const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [cropBox, setCropBox] = useState([]);
  return (
    <div className="imageEditor">
      <CropboxProvider value={{
        cropBox,
        setCropBox
      }}>
        <FileProvider value={{
          image,
          setImage
        }}>
          <ImageContainer>
            <ImageDropZone/>
            <ImageCanvas/>
          </ImageContainer>
          <Coordinate/>
        </FileProvider>
      </CropboxProvider>
    </div>
  );
}
 
export default ImageEditor;