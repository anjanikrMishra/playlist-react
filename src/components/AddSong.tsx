import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { ISongData } from "../interfaces/ISongData";
import { sendSong } from "../services/SongsService";
const AddSong = () => {
  const navigate = useNavigate();
  const initialSongState: ISongData = {
    id: null,
    title: "",
    artists: "",
    composer: "",
    year: "",
    album: "",
    url: "",
  };
  const [song, setSongValues] = useState<ISongData>(initialSongState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const saveSong = async () => {
    //save the song here
    try {
      await sendSong(song);
      setSubmitted(true);
      alert("Saved successfully");
      console.log(song);
      navigate("/");
    } catch (err) {
      alert("Save Failed");
    }
  };

  //   const newSong = () => {
  //     setSongValues(initialSongState);
  //     setSubmitted(false);
  //   };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name);
    setSongValues({ ...song, [name]: value });
  };

  return (
    <Container component="main">
      <Grid container spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4">Add a Song</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            value={song.title}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="artists"
            label="Artists"
            value={song.artists}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="composer"
            label="Composer"
            value={song.composer}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="year"
            label="Year"
            value={song.year}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="album"
            label="Album"
            value={song.album}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="url"
            label="Youtube URL"
            value={song.url}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={saveSong}>
            {" "}
            Add song{" "}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddSong;
