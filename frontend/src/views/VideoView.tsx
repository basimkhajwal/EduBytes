import React from "react";

import "./VideoView.css";

export interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
  };
}

export interface Props {
  video: Video;
}

const View = (props: Props) => {
  const {
    id,
    snippet: { title, description },
  } = props.video;
  return (
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
      <h6 className="title is-6 block">Description</h6>
      <p className="block">{description}</p>
    </div>
  );
};

export default View;
