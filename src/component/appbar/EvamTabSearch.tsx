import {ReactNode} from "react";
import {Button, Grid} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";

interface EvamTabSearchProps {
    children?: ReactNode;
}

/**
 * Evam Search component, this component can be used as an Extra Function for
 * the EvamAppBarLayout to show a search function
 * @param props component props
 * @constructor
 */
export function EvamTabSearch(props: EvamTabSearchProps) {
    const {children, ...other} = props

    const navigate = useNavigate()
    const {search} = useLocation()

    return (
        <Button {...other} onClick={
            () => {
                navigate("/search" + search)
            }
        }>
            <Grid padding={"1px"} container
                  spacing={0}
                  height={96}
                  width={96}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
                <Search sx={{color: 'white', height: 96}} fontSize={"large"}/>
            </Grid>
        </Button>
    )
}