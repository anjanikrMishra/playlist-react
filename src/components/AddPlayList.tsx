import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { IPlayListData } from "../interfaces/IPlayListData";
import { addPlaylist } from "../services/SongsService";

const AddPlayList = () => {
  const navigate = useNavigate();
  const variant = "outlined";
  const initialSongState: IPlayListData = {
    id: null,
    name: "",
  };
  const [playlist, setPlaylist] = useState<IPlayListData>(initialSongState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const savePlaylist = async () => {
    //save the song here
    try {
      await addPlaylist(playlist);
      setSubmitted(true);
      alert("Saved successfully");
      console.log(playlist);
      navigate("/");
    } catch (err) {
      alert("Save Failed");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name);
    setPlaylist({ ...playlist, [name]: value });
  };

  return (
    <Container component="main">
      <Grid container spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4">Add a Playlist</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="PlayList name"
            value={playlist.name}
            sx={{ width: { xs: "50ch" } }}
            onChange={handleInputChange}
            variant={variant}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={savePlaylist}>
            {" "}
            Add Playlist{" "}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddPlayList;
