import './App.css';
import Video from './video/Video';
import RealTimeChart from './charts/RealTimeChart';
import FileHistory from './History.js';
import Croppic from './Croppic.js';

function App() {
  return (
    <div className='wrapper'>
      <div className='box4 box'><Croppic /></div>
      <div className='box3 box'><RealTimeChart /></div>
      <div className='box2 box'><Video /></div>
      <div className='box1 box'><FileHistory /></div>
    </div>
  );

}
export default App;