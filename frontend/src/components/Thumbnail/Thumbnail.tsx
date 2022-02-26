import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

interface VideoInfo {
  videoThumbnailUrl: string;
  videoTitle: string;
  videoLength: string;
  channelName: string;
  numViews: string;
  numFoundHelpful: string;
  numComments: string;
  tags: Array<string>;
}

interface Props {
  videoInfo: VideoInfo;
}

const Thumbnail = (props: Props) => {
  const {
    videoThumbnailUrl,
    videoTitle,
    videoLength,
    channelName,
    numViews,
    numFoundHelpful,
    numComments,
    tags,
  } = props.videoInfo;
  return (
    <div className="column is-one-quarter is-full-mobile video">
      <div>
        <div className="card-image">
          <figure>
            <img src={videoThumbnailUrl}></img>
          </figure>
        </div>
        {/* <div className="is-overlay">
          <div className="thumbnail-length is-pulled-right">
            <span className="tag is-dark">{videoLength}</span>
          </div>
        </div> */}
      </div>
      <div className="has-text-weight-bold">{videoTitle}</div>
      <div className="is-size-7">{channelName}</div>
      <div className="is-size-7">
        {numViews} views • {numFoundHelpful} said helpful • {numComments}{" "}
        comments
      </div>
      <div className="tags pt-2">
        {tags.map((tag: string) => {
          return <span className="tag is-link is-light">{tag}</span>;
        })}
      </div>
    </div>
  );
};

export default Thumbnail;
