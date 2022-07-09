import { PlaylistAdd } from "@mui/icons-material";
import {
  Link,
  Typography,
  Box,
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import { IPlayListData } from "../interfaces/IPlayListData";
import { ISongData } from "../interfaces/ISongData";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowSong from "./ShowSong";
import { useEffect, useState } from "react";
import { deleteSongFromPlayList } from "../services/SongsService";

const ShowPlayList = (props: {
  playlist: IPlayListData | null;
  songs: ISongData[];
}) => {
  useEffect(() => {
    setSongs(props.songs);
    setCurrentSong(null);
  }, [props.songs]);
  const [currentSong, setCurrentSong] = useState<ISongData | null>(null);
  const [songs, setSongs] = useState<Array<ISongData>>(props.songs);
  const showSong = (song: ISongData) => {
    setCurrentSong(song);
  };
  const deleteSongFromPlaylistWithID = async (songID: any) => {
    try {
      await deleteSongFromPlayList(props.playlist?.id, songID);
      const song_filter = songs.filter((song) => song.id !== songID);
      setSongs(song_filter);
      if (currentSong && currentSong.id === songID) {
        setCurrentSong(null);
      }
    } catch (err) {
      alert("Not Deleted...");
      console.log(err);
    }
  };
  return props.playlist !== null ? (
    <>
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Playlist : {props.playlist.name}
      </Typography>
      {songs.length ? (
        <Box sx={{ marginLeft: 1 }}>
          <Typography variant="h4" component="div" sx={{ marginBottom: 1 }}>
            Songs :
          </Typography>
          {songs.map((song, index) => (
            <Paper
              elevation={3}
              sx={{
                marginY: 1,
                display: "flex",
                overflow: "hidden",
              }}
              key={index}
            >
              <ListItem
                onClick={() => {
                  showSong(song);
                }}
              >
                <ListItemText primary={song.title} />
              </ListItem>

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  deleteSongFromPlaylistWithID(song.id);
                }}
                sx={{ paddingX: 2.5 }}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography variant="h5" component="div" sx={{ marginLeft: 1 }}>
          No songs here!!
        </Typography>
      )}
      <Grid item xs={12}>
        <Box sx={{ margin: 1 }}>
          {currentSong === null ? "" : <ShowSong song={currentSong} />}
        </Box>
      </Grid>
    </>
  ) : (
    <></>
  );
};

export default ShowPlayList;
