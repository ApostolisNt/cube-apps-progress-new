import DefaultBackgroundVideo from "../assets/videos/scan-default.mp4";
import LisburnBackgroundVideo from "../assets/videos/scan-lisburn.mp4";

const backgroundVideos: Record<string, string> = {
  lisburn: LisburnBackgroundVideo,
};

export const getBackgroundVideo = (location: string): string => {
  return backgroundVideos[location] || DefaultBackgroundVideo;
};
