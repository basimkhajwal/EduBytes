import React from "react";
import "./VideoView.css";
import Video from "../models/Video";
import Navbar from "../components/Navbar/Navbar";
import { Card, CardMedia, Container, Fab, Grid, Stack, Typography } from '@mui/material';
export interface Props {
  video: Video;
  onSearch: (query: string) => void;
  backHome: () => void;
}
const View = (props: Props) => {
  const {
    id,
    snippet: { title, description, channelTitle, tags, thumbnails },
  } = props.video;
  const formattedDescription = description
    .split("\n")
    .map((str) => <p>{str}</p>);
  const joinedTags = tags === undefined ? "" : tags.join(", ");
  return (
    <>
      <Navbar backHome={props.backHome} />
      <br />
      <Stack spacing={3} sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Typography component="h1" className="title is-2 block has-text-centered">{title}</Typography>
        <Card component="div" className="playerContainer">
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="embedding"
            id="embedding"
            sx={{
              frameBorder: 0,
              allow: "autoplay; picture-in-picture; fullscreen",
              sandbox: "allow-same-origin allow-scripts",
              width: window.innerWidth,
              height: window.innerWidth * 0.5625,
            }}
          />
        </Card>
        <Typography component="div" className="is-size-7">{channelTitle}</Typography>
        <Grid container spacing={3}>
          {tags === undefined ? (<></>) : tags.map((tag: string) => {
            return <Grid item xs="auto"><Fab className="tag is-link is-light"
              size="small" onClick={() => props.onSearch(tag)}
              variant="extended" aria-label="add" sx={{ textTransform: "none" }}>{tag}</Fab></Grid>;
          })}
        </Grid>
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Typography component="h6" className="title is-6 block has-text-centered">Description</Typography>
            <Typography component="div" className="is-size-7">{formattedDescription}</Typography>
          </Stack>
          <Stack spacing={3}>
            <Typography component="h6" className="title is-6 block has-text-centered">Relevant Links</Typography>
            <Typography component="div" className="is-size-7">{joinedTags}</Typography>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
export default View;
