import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ISongData } from "../interfaces/ISongData";
import {
  getAllSongs,
  deleteSong,
  getAllPlayLists,
  deletePlayList,
  getAllSongFromPlayList,
  addSongToPlayList,
} from "../services/SongsService";
import ShowSong from "./ShowSong";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IPlayListData } from "../interfaces/IPlayListData";
import ShowPlayList from "./ShowPlayList";
// import { makeStyles, createStyles } from "@mui/styles";

const DashBoard = () => {
  const initialSongState: ISongData = {
    id: null,
    title: "",
    artists: "",
    composer: "",
    year: "",
    album: "",
    url: "",
  };
  const [songs, setSongs] = useState<Array<ISongData>>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [songsOfPlayList, setSongsOfPlayList] = useState<Array<ISongData>>([]);
  const [playLists, setPlaylists] = useState<Array<IPlayListData>>([]);
  const [currentSong, setCurrentSong] = useState<ISongData | null>(null);
  const [currentPlayList, setCurrentPlayList] = useState<IPlayListData | null>(
    null
  );
  const [playListSelectionDetails, setPlayListSelectionDetails] = useState<{
    id: string;
    songid: number;
  }>({ id: "", songid: 0 });
  const handleInputChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    // console.log(value);
    setPlayListSelectionDetails({
      id: value,
      songid: playListSelectionDetails.songid,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    refresh();
  }, []);
  const loadSongs = async () => {
    //get songs from the backend here
    let songs;
    try {
      songs = await getAllSongs();
      if (songs) setSongs(songs);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllPlaylist = async () => {
    let playlists;
    try {
      playlists = await getAllPlayLists();
      if (playlists) setPlaylists(playlists);
    } catch (err) {
      console.log(err);
    }
  };
  const refresh = () => {
    loadSongs();
    getAllPlaylist();
    setCurrentPlayList(null);
    setCurrentSong(null);
  };
  const showSong = (song: ISongData) => {
    setCurrentSong(song);
  };
  const showPlayList = async (playList: IPlayListData) => {
    // get songs of playlist
    let songsOfPlayList = await getAllSongFromPlayList(playList.id);
    console.log(songsOfPlayList);
    setCurrentPlayList(playList);
    if (songsOfPlayList && songsOfPlayList?.length !== 0)
      setSongsOfPlayList(songsOfPlayList);
    else {
      setSongsOfPlayList([]);
    }
    // setSongsOfPlayList([]);
  };
  const deletePlayListID = async (playListID: any) => {
    try {
      await deletePlayList(playListID);
      const play_filter = playLists.filter(
        (playList) => playList.id !== playListID
      );
      setPlaylists(play_filter);
      if (currentPlayList && currentPlayList.id === playListID) {
        setCurrentPlayList(null);
      }
    } catch (err) {
      alert("Not Deleted...");
      console.log(err);
    }
  };

  const deleteSongWithID = async (songID: any) => {
    try {
      await deleteSong(songID);
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

  const addSongToPlayListWithID = async () => {
    try {
      await addSongToPlayList(
        playListSelectionDetails.songid,
        Number(playListSelectionDetails.id)
      );
      alert("Saved successfully");
      setOpen(false);
      refresh();
    } catch (err) {
      alert("Not added to playlist...");
      console.log(err);
    }
  };
  return (
    <>
      <Grid container spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={6}>
          <Box>
            <Grid item xs={12}>
              <Typography variant="h4">All Songs</Typography>
            </Grid>
            <Grid item xs={8}>
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
                    aria-label="add"
                    onClick={() => {
                      setOpen(true);
                      setPlayListSelectionDetails({
                        ...playListSelectionDetails,
                        songid: song.id,
                      });
                      // deleteSongWithID(song.id);
                    }}
                    sx={{ paddingX: 2.5 }}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      deleteSongWithID(song.id);
                    }}
                    sx={{ paddingX: 2.5 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute" as "absolute",
                        top: "25%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography variant="h6" component="h2">
                        Add song to Playlist
                      </Typography>
                      <br></br>
                      <InputLabel id="demo-simple-select-label">
                        PlayListName
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={playListSelectionDetails.id}
                        label="Age"
                        onChange={handleInputChange}
                      >
                        {playLists.map((playlist, key: any) => (
                          <MenuItem value={playlist.id} key={key}>
                            {playlist.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <br></br>
                      <br></br>
                      <Button
                        variant="contained"
                        onClick={() => {
                          addSongToPlayListWithID();
                        }}
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Add to Playlist
                      </Button>
                    </Box>
                  </Modal>
                </Paper>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/addSong");
                }}
                sx={{
                  textTransform: "none",
                }}
              >
                Add Song
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {currentSong === null ? "" : <ShowSong song={currentSong} />}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Typography variant="h4">All Playlists</Typography>
          </Grid>
          <Grid item xs={8}>
            {playLists.map((playList, index) => (
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
                    showPlayList(playList);
                  }}
                >
                  <ListItemText primary={playList.name} />
                </ListItem>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    deletePlayListID(playList.id);
                  }}
                  sx={{ paddingX: 2.5 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/addPlaylist");
              }}
              sx={{
                textTransform: "none",
              }}
            >
              Add Playlist
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {currentPlayList === null ? (
              ""
            ) : (
              <ShowPlayList
                playlist={currentPlayList}
                songs={songsOfPlayList}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DashBoard;
