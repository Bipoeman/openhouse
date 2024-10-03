import Vdt from './KMUTNB_KNACKSAT.mp4'
const Video = () => {
    return (
      <center><p></p><video controls width="95%" autoPlay loop muted className='image-container'>
        <source src={Vdt} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video><p></p></center>
    );
  };
  
  export default Video;