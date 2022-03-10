import { useEffect, useState } from "react";
import Web3 from "web3";
import {
    Avatar,
    Container,
    Grid,
    IconButton,
    Button,
    styled,
    Typography
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, FileCopy as FileCopyIcon } from "@mui/icons-material"
import { useContracts } from "../../contexts/Web3Context";
import useAuth from "../../hooks/useAuth";
import { formatBalance } from "../../helper/utils";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ProfileWrapper from "./Style";

interface IUser {
    id: number,
    fullName: string;
    email: string;
    image: any;
    phoneNumber: string;
    bio: string;
}

const StyledTextValidator = styled(TextValidator)(({ theme }) => ({
    width: "100%",
    marginBottom: 25,
    "& .MuiInputLabel-root": {
        color: "#fff"
    },
    "& .MuiInputBase-root": {
        ".MuiInputBase-input": {
          color: "#fff",
        },
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff"
        }
    }
}));

export default function Profile() {
    const { address, chainId } = useAuth();
    const {
        contracts: { tokenContract },
    } = useContracts();
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isUpdating, setIsUpdating] = useState(false);
    const [copyText, setCopyText] = useState("");

    useEffect(() => {
        fetchUserData();
    }, [])

    useEffect(() => {
        fetchBalance();
    }, [address, chainId, tokenContract]);

    const fetchBalance = async () => {
        if (!tokenContract || !address) {
            setBalance(0);
            return;
        }
        // Temp code
        if (parseInt(chainId) !== 1 && parseInt(chainId) !== 3) {
            setBalance(0);
            return;
        }

        const balance = await tokenContract.methods.balanceOf(address).call();
        const balanceCHIAO = parseInt(Web3.utils.fromWei(`${balance}`, "ether"));
        setBalance(balanceCHIAO);
    };

    const fetchUserData = async () => {

    };

    const handleUserUpdate = () => {

    };

    const handleChange = (event) => {
        event.persist();
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setUser({...user, image: fileReader.result});
        }

        fileReader.readAsDataURL(file);
    };

    const handleImageDelete = () => {
        setUser({...user, image: null})
    };

    const handleAddressCopy = () => {
        navigator.clipboard.writeText(address);
        setCopyText("Copied!");
        setTimeout(() => {
            setCopyText("");
        }, 1000)
    };

    return (
        <Container maxWidth="lg">
            <ProfileWrapper>
                <Grid container mb={3}>
                    <Grid item>
                        <Typography fontSize={20} color="#fff">
                            {address}
                            <IconButton sx={{color: "#fff"}} component="span" onClick={handleAddressCopy}>
                                <FileCopyIcon />
                                <span className="copy-text">{copyText}</span>
                            </IconButton>
                        </Typography>
                        <Typography fontSize={20} color="#fff">
                            Balance:{" "}
                            <span className="chiao-value">
                                {formatBalance(balance)} (ETH)
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <Avatar sx={{width: 200, height: 200}} src={user.image} alt={user.fullName} />
                                <input accept="image/*" type="file" className="hidden" id="user-image-file" onChange={handleFileSelect} />
                            </Grid>

                            <Grid item>
                                <label htmlFor="user-image-file">
                                    <IconButton component="span">
                                        <EditIcon sx={{color: "#fff"}} />
                                    </IconButton>
                                </label>
                                <IconButton component="span" onClick={handleImageDelete}>
                                    <DeleteIcon sx={{color: "#fff"}} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <ValidatorForm onSubmit={handleUserUpdate}>
                            <StyledTextValidator
                                className="form-control"
                                label="Full Name"
                                onChange={handleChange}
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <StyledTextValidator
                                className="form-control"
                                label="Email"
                                onChange={handleChange}
                                type="text"
                                name="email"
                                value={user.email}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <StyledTextValidator
                                className="form-control"
                                label="Phone"
                                onChange={handleChange}
                                type="text"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <StyledTextValidator
                                className="form-control"
                                label="Bio"
                                onChange={handleChange}
                                type="text"
                                name="bio"
                                value={user.bio}
                                rows={6}
                                multiline={true}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
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
