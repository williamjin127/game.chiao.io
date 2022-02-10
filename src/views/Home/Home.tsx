import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Button, Container, Grid, Typography } from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import { config } from "../../config";
import ChiaoBanner from "../../components/ChiaoBanner";
import BigOutlinedButton from "../../components/BigOutlinedButton";
import HomeWrapper from "./Style";

export default function Home() {
    // const { address, chainId, loading, connect, disconnect } =
    //   useContext(AuthContext);
    const { address, chainId, loading, connect, disconnect, switchNetwork, addToken } =
        useAuth();
    const {
        contracts: { tokenContract },
        wrongNetwork,
    } = useContracts();
    const { showSnackbar } = useSnackbar();

    const [user, setUser] = useState({ address: "", chainId: 0 });
    const [balance, setBalance] = useState(0);

    const allowAmount = 100000000;

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
        <HomeWrapper>
            <Container maxWidth="md" className="HomePage">
                <Grid container flexDirection="column" justifyContent="center">
                    <Grid item pt={3}>
                        <ChiaoBanner />
                    </Grid>
                    <Grid item pt={3}>
                        {!address && (
                            <Grid container flexDirection="column" alignItems="center">
                                <div className="connect-wallet-text">
                                    To Access Chiao Fly<br />
                                    Connect Your Wallet:
                                </div>
                                <BigOutlinedButton
                                    disabled={loading}
                                    variant="outlined"
                                    onClick={connect}
                                >
                                    Connect Wallet
                                </BigOutlinedButton>

                                <Typography fontSize={18} mt={2} color="#fff">
                                  You need to connect your Metamask and have 100M CHIAO token to see
                                  content.
                                </Typography>
                            </Grid>
                        )}

                        {address && (
                            <Grid container flexDirection="column" alignItems="center">
                                <Grid item pt={3}>
                                    <BigOutlinedButton variant="outlined" color="secondary" onClick={addToken}>
                                        Add $CHIAO To Metamask
                                    </BigOutlinedButton>
                                </Grid>
                                <Grid item pt={3}>
                                    <Grid container flexDirection="column" alignItems="center">
                                        <Typography fontSize={28} mt={2} color="#fff">
                                            Choose Your Network:
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <BigOutlinedButton
                                                    variant="contained"
                                                    onClick={() => switchNetwork("0x3")}
                                                >
                                                    Ethereum
                                                </BigOutlinedButton>
                                            </Grid>
                                            <Grid item>
                                                <BigOutlinedButton
                                                    variant="contained"
                                                    onClick={() => switchNetwork("0x61")}
                                                >
                                                    Binance Smart Chain
                                                </BigOutlinedButton>
                                            </Grid>
                                            <Grid item>
                                                <BigOutlinedButton
                                                    variant="contained"
                                                    onClick={() => switchNetwork("0xfa2")}
                                                >
                                                    Fantom Opera
                                                </BigOutlinedButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item pt={3}>
                                    <Typography fontSize={28} mt={2} color="#fff">
                                        Your $CHIAO balance: <span className="chiao-value">${balance}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </HomeWrapper>
    );
}
