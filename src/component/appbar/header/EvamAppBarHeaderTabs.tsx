import {Fragment, ReactNode} from "react";
import {EvamTabExtraFunction} from "../EvamTabExtraFunction";
import Box from "@mui/material/Box";

interface EvamAppBarHeaderTabsProps {
    children: ReactNode
    special?: ReactNode|undefined
}

export function EvamAppBarHeaderTabs(props: EvamAppBarHeaderTabsProps) {
    const {children, special, ...other} = props

    return (
        <Fragment>
            <Box display={"flex"} justifyContent={"space-between"}
                 height={96} {...other}>
                <Box display="flex" justifyContent={"left"} height={96}>
                        {children}
                </Box>
                <Box display="flex" justifyContent={"right"} height={96}>
                    <EvamTabExtraFunction>
                        {special}
                    </EvamTabExtraFunction>
                </Box>
            </Box>

        </Fragment>

    )
}