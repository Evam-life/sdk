import {ReactNode} from "react";
import MenuItem from "@mui/material/MenuItem";
import {EvamTabContext} from "./EvamTabContext";
import {useNavigate} from "react-router-dom";
import {formatRoutePathByMenuId} from "./utils/formatRoutePathByMenuId";

interface EvamMenuItemProps {
    children: ReactNode;
    id: string;
}

/**
 * Component for an item in the EvamHamburgerMenu that can be navigated to
 * @param props component props
 * @constructor
 */
export function EvamMenuItem(props: EvamMenuItemProps) {
    const {children, id, ...other} = props

    const navigate = useNavigate()

    return (
        <EvamTabContext.Consumer>
            {context =>
                <MenuItem {...other} onClick={
                    () => {
                        context.setIsMenuOpen(false)
                        navigate(formatRoutePathByMenuId(id))
                    }
                }>
                    {children}
                </MenuItem>
            }
        </EvamTabContext.Consumer>

    )
}