import Vdt from 'E:/year1/knacksat-3/vr/vr-image/src/video/KMUTNB_KNACKSAT.mp4'
const Video = () => {
    return (
      <center><p></p><video controls width="95%" autoPlay loop muted className='image-container'>
        <source src={Vdt} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video><p></p></center>
    );
  };
  
  export default Video;