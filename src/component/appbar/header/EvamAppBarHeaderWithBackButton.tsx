import {ReactNode} from "react";
import Box from "@mui/material/Box";
import {Button, Grid} from "@mui/material";
import {ArrowBackIos} from "@mui/icons-material";
import {EvamTabExtraFunction} from "../EvamTabExtraFunction";
import {useLocation, useNavigate} from "react-router-dom";

interface EvamAppBarHeaderWithBackButtonProps {
    children: ReactNode
    special?: ReactNode
}

export function EvamAppBarHeaderWithBackButton(props: EvamAppBarHeaderWithBackButtonProps) {
    const {children, special, ...other} = props
    const navigate = useNavigate()
    const {search} = useLocation()

    return (
        <Box display="flex" justifyContent="space-between" height={96} {...other}>
            <Box display="flex" justifyContent={"left"}
                 width={"90%"}
                 paddingLeft={"24px"} height={96}>
                <Grid padding={"1px"} container
                      spacing={0}
                      item xs={1}
                      direction="column"
                      alignItems="center"
                      justifyContent="center">
                    <Button onClick={
                        () => {
                            navigate(`/${search}`)
                        }
                    }>
                        <ArrowBackIos sx={{color: 'white', height: 96}} fontSize={"large"}/>
                    </Button>

                </Grid>
                <Grid padding={"1px"} container
                      spacing={0}
                      item xs={11}
                      paddingLeft={"16px"}
                      direction="column"
                      alignItems="center"
                      justifyContent="center">
                    {children}
                </Grid>
            </Box>
            <Box display="flex" justifyContent={"right"} height={96}>
                <EvamTabExtraFunction>
                    {special}
                </EvamTabExtraFunction>
            </Box>
        </Box>
    )
}