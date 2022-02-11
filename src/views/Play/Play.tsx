import { useEffect, useState } from "react";
import Web3 from "web3";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import { formatBalance } from "../../helper/utils";
import GameStage from "../../components/GameStage";
import PlayWrapper from "./Style";

const AllowAmount = 100000000;

export default function Play() {
    const history = useHistory()
    const { address, chainId } = useAuth();
    const {
        contracts: { tokenContract },
        wrongNetwork,
    } = useContracts();
    const { showSnackbar } = useSnackbar();
    const [balance, setBalance] = useState(0);

    const fetchInfo = async () => {
        if (!tokenContract || !address) {
            setBalance(0);
            return;
        }
        // Temp code
        if (parseInt(chainId) !== 3) {
            setBalance(0);
            return;
        }

        const balance = await tokenContract.methods.balanceOf(address).call();
        const balanceCHIAO = parseInt(Web3.utils.fromWei(`${balance}`, "ether"));
        setBalance(balanceCHIAO);
    };

    useEffect(() => {
        const isConnected = checkConnect();
        if (isConnected) {
            fetchInfo();
        }
    }, [address, chainId]);

    useEffect(() => {
        if (!tokenContract) {
            return;
        }
        fetchInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenContract]);

    const checkConnect = () => {
        if (!address) {
            showSnackbar({
                severity: "error",
                message: "Please connect your wallet.",
            });
            return false;
        }
        return true;
    };

    if (balance < AllowAmount) {
        showSnackbar({
            severity: "error",
            message: "You don't have the sufficient balance.",
        });

        history.push("/");
    }

    return (
        <PlayWrapper>
            <Container maxWidth="xl">
                <Grid container flexDirection="column" alignItems="center">
                    <Grid item pt={3}>
                        <GameStage />
                    </Grid>
                    <Grid item pt={3}>
                        <Typography fontSize={28} mt={2} color="#fff">
                            Your $CHIAO Balance: <span className="chiao-value">{formatBalance(balance)} (ETH)</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </PlayWrapper>
    );
}
