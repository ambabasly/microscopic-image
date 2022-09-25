import React from 'react';
import ImageSlides from './components/List/List';
import Image from './components/Image/Image';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = (): JSX.Element => {
  return (
      <Router>
        <Routes>
        <Route index element={<ImageSlides />} />
        <Route path="/image/:id" element={<Image/>}/>
        </Routes>
      </Router>
  );
}

export default App;
