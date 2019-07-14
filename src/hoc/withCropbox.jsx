import React from 'react';
import {Consumer} from 'contexts/cropboxContext';

const withCropbox = Component => props => (
  <Consumer>
    {cropBox => <Component {...props} cropBox={cropBox}/>}
  </Consumer>
);
 
export default withCropbox;