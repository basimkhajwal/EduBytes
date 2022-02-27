import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

import Video from "../../models/Video";

import { Card, CardContent, CardMedia, Chip, Fab, Link, Typography } from "@mui/material";

interface Props {
  video: Video;
  onSearch: (query: string) => void;
  backHome: () => void;
  onVideoSelect: (video: Video) => void;
}

const formatCounts = (numString: string) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(Number(numString));
};

const Thumbnail = (props: Props) => {
  const {
    id,
    snippet: { title, description, channelTitle, tags, thumbnails },
    contentDetails: { duration },
    statistics: { viewCount, likeCount, commentCount },
  } = props.video;
  const tagsValid = tags ?? [];
  // const urls =
  //   thumbnails === undefined
  //     ? []
  //     : Object.values(thumbnails)
  //       .map((v) => v?.url)
  //       .filter((v): v is string => v !== undefined);
  // const url = urls.length === 0 ? "default" : urls[0];

  const url = thumbnails ? (
    thumbnails.maxres ? thumbnails.maxres.url : (
      thumbnails.high ? thumbnails.high.url : (
        thumbnails.medium ? thumbnails.medium.url : (
          thumbnails.default ? thumbnails.default.url : "default"
        )))) : "default";

  return (
    <Card className="column is-one-quarter is-full-mobile video">
      <CardMedia component="img" src={url} className="card-image" />
      <CardContent>
        <Link underline="hover" className="has-text-weigt-bold" onClick={() => props.onVideoSelect(props.video)}>{title}</Link>
        <Typography component="div" className="is-size-7">{channelTitle}</Typography>
        <Typography component="div" className="is-size-7">
          {formatCounts(viewCount)} views • {formatCounts(likeCount)} said helpful • {formatCounts(commentCount)} comments
        </Typography>
      </CardContent>
      <CardContent component="div" className="tags pt-2">
        {tagsValid.map((tag: string) => {
          return <Fab className="tag is-link is-light"
            size="small" onClick={() => props.onSearch(tag)}
            variant="extended" aria-label="add" sx={{ textTransform: "none" }}>{tag}</Fab>;
        })}
      </CardContent>
    </Card>
  );

  // return (
  //   <div className="column is-one-quarter is-full-mobile video">
  //     <div>
  //       <div className="card-image">
  //         <figure>
  //           <img src={url}></img>
  //         </figure>
  //       </div>
  //       {/* <div className="is-overlay">
  //         <div className="thumbnail-length is-pulled-right">
  //           <span className="tag is-dark">{videoDuration}</span>
  //         </div>
  //       </div> */}
  //     </div>
  //     <div className="has-text-weight-bold">{title}</div>
  //     <div className="is-size-7">{channelTitle}</div>
  //     <div className="is-size-7">
  //       {formatCounts(viewCount)} views • {formatCounts(likeCount)} said helpful
  //       • {formatCounts(commentCount)} comments
  //     </div>
  //     <div className="tags pt-2">
  //       {tagsValid.map((tag: string) => {
  //         return <span className="tag is-link is-light">{tag}</span>;
  //       })}
  //     </div>
  //   </div>
  // );
};

export default Thumbnail;
