import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Grid, Typography } from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import { config } from "../../config";
import { formatBalance } from "../../helper/utils";
import GameStage from "../../components/GameStage";
import PlayWrapper from "./Style";

export default function Play() {
    // const { address, chainId, loading, connect, disconnect } =
    //   useContext(AuthContext);
    const { address, chainId, loading, connect, disconnect, switchNetwork, addToken } = useAuth();
    const {
        contracts: { tokenContract },
        wrongNetwork,
    } = useContracts();
    const { showSnackbar } = useSnackbar();

    const [user, setUser] = useState({ address: "", chainId: 0 });
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
        if (!address || !chainId) {
            setUser({ address: "", chainId: 0 });
            return;
        }
        console.log(address, chainId, wrongNetwork);
        checkConnect();
        setUser({ address, chainId: parseInt(chainId) });
        fetchInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
