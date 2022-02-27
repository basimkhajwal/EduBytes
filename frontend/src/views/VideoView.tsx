import React from "react";
import "./VideoView.css";
import Video from "../models/Video";
import Navbar from "../components/Navbar/Navbar";
import { formatCounts } from "../utilities/countHelper";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardMedia,
  Fab,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

import videos from "../data/videos.json";

export interface Props {
  onSearch: (query: string) => void;
  backHome: () => void;
}

function findVideo(videoId: string | undefined): Video | undefined {
  for (const video of videos as Video[]) {
    if (video.id === videoId) {
      return video;
    }
  }
  return undefined;
}

const View = (props: Props) => {
  const params = useParams();
  const video = findVideo(params.id);

  React.useEffect(() => {
    if (video !== undefined) {
      const history = window.localStorage.getItem("history") ?? "";
      const newHistory = [video.id, ...history.split(",")]
        .splice(0, 20)
        .join(",");
      window.localStorage.setItem("history", newHistory);
    }
  });

  if (video === undefined) {
    return <div>Error: Video not found!</div>;
  }

  const {
    id,
    snippet: { title, description, channelTitle, tags },
    statistics: { viewCount, likeCount },
  } = video;
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
        <Typography
          component="h1"
          className="title is-2 block has-text-centered"
        >
          {title}
        </Typography>
        <Card
          component="div"
          className="block playerContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            border: "none",
            boxShadow: "none",
          }}
        >
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
              width: window.innerWidth * 0.8 - 20,
              height: (window.innerWidth * 0.8 - 20) * 0.5625,
            }}
          />
        </Card>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">
              {"Channel: " + channelTitle}
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">
              {formatCounts(viewCount) + " views"}
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Typography component="div" className="is-size-4">
              {formatCounts(likeCount) + " likes"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            Tags:
          </Grid>
          {tags === undefined ? (
            <></>
          ) : (
            tags.map((tag: string) => {
              return (
                <Grid item xs="auto">
                  <Fab
                    className="tag is-link is-light"
                    size="small"
                    onClick={() => props.onSearch(tag)}
                    variant="extended"
                    aria-label="add"
                    sx={{ textTransform: "none" }}
                  >
                    {tag}
                  </Fab>
                </Grid>
              );
            })
          )}
        </Grid>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                component="h4"
                className="title is-4 block has-text-centered"
              >
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" className="is-size-6">
                {formattedDescription}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                component="h4"
                className="title is-4 block has-text-centered"
              >
                Relevant Links
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" className="is-size-6">
                {joinedTags}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Stack>
    </>
  );
};
export default View;
