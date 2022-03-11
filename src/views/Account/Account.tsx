import { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  IconButton,
  Button,
  styled,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
} from "@mui/icons-material";

import { useContracts } from "../../contexts/Web3Context";
import useAuth from "../../hooks/useAuth";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ProfileWrapper from "./Style";
import ApiService from "../../helper/api";
import { useSnackbar } from "../../contexts/Snackbar";

interface IUser {
  address: number;
  username: string;
  email: string;
  avatar: any;
  phone: string;
}

const StyledTextValidator = styled(TextValidator)(({ theme }) => ({
  width: "100%",
  marginBottom: 25,
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputBase-root": {
    ".MuiInputBase-input": {
      color: "#fff",
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
  },
}));

export default function Account() {
  const { address } = useAuth();
  const { balance } = useContracts();
  const { showSnackbar } = useSnackbar();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [copyText, setCopyText] = useState("");

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    const player = await ApiService.getPlayer(address);
    setUser({
      address: player.address,
      username: player.username,
      email: player.email,
      avatar: player.avatar,
      phone: player.phone,
    })
  };

  const handleUserUpdate = async () => {
    try {
      console.log(user);
      if (!user.address) {
        user.address = address;
      }
      await ApiService.savePlayer(user);
    } catch (err) {
      showSnackbar({
        severity: "error",
        message: "Wrong input",
      });
    }
  };

  const handleChange = (event) => {
    event.persist();
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setUser({ ...user, avatar: fileReader.result });
    };

    fileReader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setUser({ ...user, avatar: null });
  };

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(address);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("");
    }, 1000);
  };

  return (
    <Container maxWidth="lg">
      <ProfileWrapper>
        <Grid container mb={3}>
          <Grid item>
            <Typography fontSize={20} color="#fff">
              {address}
              <IconButton
                sx={{ color: "#fff" }}
                component="span"
                onClick={handleAddressCopy}
              >
                <FileCopyIcon />
                <span className="copy-text">{copyText}</span>
              </IconButton>
            </Typography>
            <Typography fontSize={20} color="#fff">
              Balance:{" "}
              <span className="chiao-value">
                {balance} (CHIAO)
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={user.avatar}
                  alt={user.username}
                />
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  id="user-image-file"
                  onChange={handleFileSelect}
                />
              </Grid>

              <Grid item>
                <label htmlFor="user-image-file">
                  <IconButton component="span">
                    <EditIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </label>
                <IconButton component="span" onClick={handleImageDelete}>
                  <DeleteIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <ValidatorForm onSubmit={handleUserUpdate}>
              <StyledTextValidator
                className="form-control"
                label="Username"
                onChange={handleChange}
                type="text"
                name="username"
                value={user.username || ''}
              />
              <StyledTextValidator
                className="form-control"
                label="Email"
                onChange={handleChange}
                type="text"
                name="email"
                value={user.email || ''}
              />
              <StyledTextValidator
                className="form-control"
                label="Phone"
                onChange={handleChange}
                type="text"
                name="phone"
                value={user.phone || ''}
              />

              <Button variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </ValidatorForm>
          </Grid>
        </Grid>
      </ProfileWrapper>
    </Container>
  );
}
