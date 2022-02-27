import React from "react";

import "./VideoView.css";

import Video from "../models/Video";
import Navbar from "../components/Navbar/Navbar";

export interface Props {
  video: Video;
  backHome: () => void;
}

const View = (props: Props) => {
  const {
    id,
    snippet: { title, description },
  } = props.video;
  const formattedDescription = description
    .split("\n")
    .map((str) => <p>{str}</p>);
  return (
    <>
      <Navbar backHome={props.backHome} />
      <div className="box has-text-centered">
        <div className="block">
          <iframe
            title="embedding"
            id="embedding"
            src={"http://www.youtube.com/embed/" + id}
            frameBorder={0}
            allowFullScreen
          ></iframe>
        </div>
        <h3 className="title is-4 block">{title}</h3>
        <h6 className="title is-6 block">Descriptions</h6>
        <div className="is-size-7">{formattedDescription}</div>
      </div>
    </>
  );
};

export default View;
