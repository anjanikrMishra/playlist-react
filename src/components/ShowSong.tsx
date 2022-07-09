import { Link, Typography, Box } from "@mui/material";
import { ISongData } from "../interfaces/ISongData";

const ShowSong = (props: { song: ISongData | null }) => {
  return props.song !== null ? (
    <>
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Song Details
      </Typography>
      <Box sx={{ marginLeft: 1 }}>
        <Typography variant="h6">
          <strong>Title : </strong>
          {props.song.title}
        </Typography>
        <Typography variant="h6">
          <strong>Artist's: </strong>
          {props.song.artists}
        </Typography>
        <Typography variant="h6">
          <strong>Composer's: </strong>
          {props.song.composer}
        </Typography>
        <Typography variant="h6">
          <strong>Year: </strong>
          {props.song.year}
        </Typography>
        <Typography variant="h6">
          <strong>Album: </strong>
          {props.song.album}
        </Typography>
        <Typography variant="h6">
          <strong>Link to URL : </strong>{" "}
          <Link href={props.song.url} target="_blank">
            URL
          </Link>
        </Typography>
      </Box>
    </>
  ) : (
    <></>
  );
};

export default ShowSong;
