import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {ReactNode} from "react";
import {EvamAppBarHeaderWithBackButton} from "./EvamAppBarHeaderWithBackButton";

interface EvamAppBarHeaderMenuProps {
    special: ReactNode;
}

/**
 * App bar header menu title component
 * @param props component props
 * @constructor
 */
export function EvamAppBarHeaderMenu(props: EvamAppBarHeaderMenuProps) {
    const {special, ...other} = props
    const params = useParams()

    return (
        <EvamAppBarHeaderWithBackButton special={special} {...other}>
            <Typography fontSize={24}>{params.menuId}</Typography>
        </EvamAppBarHeaderWithBackButton>
    )
}