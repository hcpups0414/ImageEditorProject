import React from 'react';
import {Consumer} from 'contexts/fileContext';

const withFile = Component => props => (
  <Consumer>
    {file => <Component {...props} file={file}/>}
  </Consumer>
);

export default withFile;