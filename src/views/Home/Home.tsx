import { useEffect, useState } from "react";
import Web3 from "web3";
import { Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useContracts } from "../../contexts/Web3Context";
import { useSnackbar } from "../../contexts/Snackbar";
import useAuth from "../../hooks/useAuth";
import ChiaoBanner from "../../components/ChiaoBanner";
import BigOutlinedButton from "../../components/BigOutlinedButton";
import HomeWrapper from "./Style";
import { formatBalance } from "../../helper/utils";

export default function Home() {
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
            <Container maxWidth="lg">
                <Grid container direction="column" justifyContent="center">
                    <Grid item pt={3}>
                        <ChiaoBanner />
                    </Grid>
                    <Grid item pt={3}>
                        {!address && (
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography fontSize={28} color="#F9F9F5" align="center" className="connect-wallet-text">
                                        To Access Chiao Fly<br />
                                        Connect Your Wallet:
                                    </Typography>
                                </Grid>
                                <Grid item mt={2} className="text-center">
                                    <BigOutlinedButton
                                        disabled={loading}
                                        color="#FEAC00"
                                        onClick={connect}
                                    >
                                        Connect Wallet
                                    </BigOutlinedButton>
                                </Grid>
                                <Grid item mt={2} className="text-center">
                                    <Typography fontSize={18} mt={2} color="#fff">
                                        You need to connect your Metamask and have 100M CHIAO token to see
                                        content.
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}

                        {address && (
                            <Grid container direction="column" justifyContent="center">
                                <Grid item pt={3}>
                                    <Grid container direction="column" justifyContent="center">
                                        <Grid item>
                                            <Typography fontSize={28} mt={2} color="#fff" align="center">
                                                Choose Your Network:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container pt={1} spacing={3} justifyContent="space-between">
                                                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} sx={{textAlign: "center"}}>
                                                    <BigOutlinedButton
                                                        color="#FEAC00"
                                                        onClick={() => switchNetwork("0x3")}
                                                    >
                                                        Ethereum
                                                    </BigOutlinedButton>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} sx={{textAlign: "center"}}>
                                                    <BigOutlinedButton
                                                        color="#FEAC00"
                                                        onClick={() => switchNetwork("0x61")}
                                                    >
                                                        Binance Smart Chain
                                                    </BigOutlinedButton>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} sx={{textAlign: "center"}}>
                                                    <BigOutlinedButton
                                                        color="#FEAC00"
                                                        onClick={() => switchNetwork("0xfa2")}
                                                    >
                                                        Fantom Opera
                                                    </BigOutlinedButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item pt={3}>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <BigOutlinedButton color="#6AE707" onClick={addToken}>
                                                Add $CHIAO To Metamask
                                            </BigOutlinedButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography fontSize={28} mt={2} color="#fff" align="center">
                                                Your $CHIAO balance: <span className={`chiao-value ${balance > allowAmount ? 'greater-than' : 'less-than'}`}>{formatBalance(balance)}</span>
                                            </Typography>
                                        </Grid>

                                    </Grid>
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
                                                    color="#6AE707"
                                                    onClick={() => goToPlay()}
                                                    sx={{
                                                        fontSize: "28px",
                                                        color: "#6AE707"
                                                    }}
                                                >
                                                    Enter Chiao Fly
                                                </BigOutlinedButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid item pt={3}>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Typography fontSize={28} color="#fff" align="center">
                                                    To play Chiao Fly, you must hold at least 100M $CHIAO Tokens.<br />
                                                    You can win $CHIAO token for FREE in <a href="https://chiao.io/wp-content/uploads/2022/01/Disclaimer.txt" className="chiao-purchase-link">Discord</a> or just Buy them:
                                                </Typography>
                                            </Grid>
                                            <Grid item mt={2} className="text-center">
                                                <BigOutlinedButton
                                                    color="#6AE707"
                                                    onClick={() => handleTokenPurchase()}
                                                    sx={{
                                                        fontSize: "28px",
                                                        color: "#6AE707"
                                                    }}
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
