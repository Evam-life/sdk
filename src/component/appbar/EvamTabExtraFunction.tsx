import {ReactNode} from "react";
import {Grid} from "@mui/material";

interface EvamTabSpecialProps {
    children: ReactNode;
}

/**
 * Wrapper component for any Extra Function to be added to EvamAppBarComponent
 * @param props
 * @constructor
 */
export function EvamTabExtraFunction(props: EvamTabSpecialProps) {
    const {children, ...other} = props

    return (
            <Grid item xs={1} direction={"row"}
                  justifyContent={"right"} alignItems={"center"} paddingRight={"8px"}
                  {...other}>
                {children}
            </Grid>

    )
}