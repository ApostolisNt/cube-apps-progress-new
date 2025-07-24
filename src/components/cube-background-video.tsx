type CubeBackgroundVideoProps = {
  src: string;
};

const CubeBackgroundVideo = ({ src }: CubeBackgroundVideoProps) => {
  return (
    <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default CubeBackgroundVideo;
