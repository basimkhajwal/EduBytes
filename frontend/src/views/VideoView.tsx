import React from "react";
import "./VideoView.css";
import Video from "../models/Video";
import Navbar from "../components/Navbar/Navbar";
import { Card, CardMedia, Container, Divider, Fab, Grid, Stack, Typography } from '@mui/material';
export interface Props {
  video: Video;
  onSearch: (query: string) => void;
  backHome: () => void;
}

const View = (props: Props) => {
  const {
    id,
    snippet: { title, description, channelTitle, tags },
    statistics: { viewCount, likeCount },
  } = props.video;
  const formattedDescription = description
    .split("\n")
    .map((str) => <p>{str}</p>);
  console.log(formattedDescription);
  const joinedTags = tags === undefined ? "" : tags.join(", ");
  return (
    <>
      <Navbar backHome={props.backHome} />
      <br />
      <Stack spacing={3} sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Typography component="h1" className="title is-2 block has-text-centered">{title}</Typography>
        <Card component="div" className="block playerContainer">
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="embedding"
            id="embedding"
            sx={{
              display: "block",
              frameBorder: 0,
              allow: "autoplay; picture-in-picture; fullscreen",
              sandbox: "allow-same-origin allow-scripts",
              width: window.innerWidth - 20,
              height: (window.innerWidth - 20) * 0.5625,
            }}
          />
        </Card>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">{"Channel: " + channelTitle}</Typography>
          </Grid>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">{viewCount + " views"}</Typography>
          </Grid>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">{likeCount + " likes"}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs="auto">Tags:</Grid>
          {tags === undefined ? (<></>) : tags.map((tag: string) => {
            return <Grid item xs="auto"><Fab className="tag is-link is-light"
              size="small" onClick={() => props.onSearch(tag)}
              variant="extended" aria-label="add" sx={{ textTransform: "none" }}>{tag}</Fab></Grid>;
          })}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={3}>
              <Typography component="h4" className="title is-4 block has-text-centered">Description</Typography>
              <Typography component="div" className="is-size-6">{formattedDescription}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={3}>
              <Typography component="h4" className="title is-4 block has-text-centered">Relevant Links</Typography>
              <Typography component="div" className="is-size-6">{joinedTags}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
export default View;
