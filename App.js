import React, {useEffect} from 'react';
import Root from './Src/Setup';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;


const App = () => {
  return (
    <>
      <Root />
    </>
  );
};
export default App;
