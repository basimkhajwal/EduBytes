import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

import Video from "../../models/Video";

interface Props {
  video: Video;
}

const Thumbnail = (props: Props) => {
  const {
    id,
    snippet: { title, description, channelTitle, tags, thumbnails },
    contentDetails: { duration },
    statistics: { viewCount, likeCount, commentCount },
  } = props.video;
  const tagsValid = tags ?? [];
  const urls =
    thumbnails === undefined
      ? []
      : Object.values(thumbnails)
          .map((v) => v?.url)
          .filter((v): v is string => v !== undefined);
  const url = urls.length === 0 ? "default" : urls[0];
  return (
    <div className="column is-one-quarter is-full-mobile video">
      <div>
        <div className="card-image">
          <figure>
            <img src={url}></img>
          </figure>
        </div>
        {/* <div className="is-overlay">
          <div className="thumbnail-length is-pulled-right">
            <span className="tag is-dark">{videoDuration}</span>
          </div>
        </div> */}
      </div>
      <div className="has-text-weight-bold">{title}</div>
      <div className="is-size-7">{channelTitle}</div>
      <div className="is-size-7">
        {viewCount} views • {likeCount} said helpful • {commentCount} comments
      </div>
      <div className="tags pt-2">
        {tagsValid.map((tag: string) => {
          return <span className="tag is-link is-light">{tag}</span>;
        })}
      </div>
    </div>
  );
};

export default Thumbnail;
