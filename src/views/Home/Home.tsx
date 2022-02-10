import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import { config } from "../../config";
import ChiaoBanner from "../../components/ChiaoBanner";
import BigOutlinedButton from "../../components/BigOutlinedButton";
import HomeWrapper from "./Style";
import { formatBalance } from "../../helper/utils";

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
    const history = useHistory();

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

    const goToPlay = () => {
        history.push("/play");
    };

    const handleTokenPurchase = () => {

    };

    return (
        <HomeWrapper>
            <Container maxWidth="xl">
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
                                    color="warning"
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
                                    <BigOutlinedButton variant="outlined" color="success" onClick={addToken}>
                                        Add $CHIAO To Metamask
                                    </BigOutlinedButton>
                                </Grid>
                                <Grid item pt={3}>
                                    <Grid container flexDirection="column" alignItems="center">
                                        <Typography fontSize={28} mt={2} color="#fff">
                                            Choose Your Network:
                                        </Typography>
                                        <Grid container spacing={1} pt={1}>
                                            <Grid item flex={1}>
                                                <BigOutlinedButton
                                                    variant="outlined"
                                                    color="warning"
                                                    onClick={() => switchNetwork("0x3")}
                                                >
                                                    Ethereum
                                                </BigOutlinedButton>
                                            </Grid>
                                            <Grid item flex={1}>
                                                <BigOutlinedButton
                                                    variant="outlined"
                                                    color="warning"
                                                    onClick={() => switchNetwork("0x61")}
                                                >
                                                    Binance Smart Chain
                                                </BigOutlinedButton>
                                            </Grid>
                                            <Grid item flex={1}>
                                                <BigOutlinedButton
                                                    variant="outlined"
                                                    color="warning"
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
                                        Your $CHIAO balance: <span className={`chiao-value ${balance > allowAmount ? 'greater-than' : 'less-than'}`}>{formatBalance(balance)}</span>
                                    </Typography>
                                </Grid>
                                {balance > allowAmount ? (
                                    <Grid item pt={3}>
                                        <Grid container direction="column" alignItems="center">
                                            <Grid item>
                                                <Typography fontSize={28} color="#fff" mb={2}>
                                                    Congrats! You have enough $CHIAO to play.
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <BigOutlinedButton
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={() => goToPlay()}
                                                >
                                                    Enter Chiao Fly
                                                </BigOutlinedButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid item pt={3}>
                                        <Grid container direction="column" alignItems="center">
                                            <Grid item>
                                                <Typography fontSize={28} color="#fff">
                                                    To play Chiao Fly, you must hold at least 100M $CHIAO Tokens.<br />
                                                    You can win $CHIAO token for FREE in <a href="#" className="chiao-purchase-link">Discord</a> or just Buy them:
                                                </Typography>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <BigOutlinedButton
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={() => handleTokenPurchase()}
                                                >
                                                    Buy $CHIAO
                                                </BigOutlinedButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </HomeWrapper>
    );
}
