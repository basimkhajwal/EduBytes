export default interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails?: {
      [key: string]:
      | {
        url?: string;
      }
      | undefined;
    };
    channelTitle: string;
    tags?: string[] | undefined;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount?: string;
  };
}
