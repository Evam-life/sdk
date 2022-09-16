import React, {ReactNode, useState} from "react";
import {Button, Grid, SxProps} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {alpha, styled} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import {EvamTabContext} from "./EvamTabContext";

interface EvamHamburgerMenuProps {
    children: ReactNode;
    sx?: SxProps;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 0,
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.text.disabled,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

/**
 * Evam hamburger menu component, this component can be used as an Extra
 * Function for the EvamAppBarLayout to show a hamburger menu
 * @param props component props
 * @constructor
 */
export function EvamHamburgerMenu(props: EvamHamburgerMenuProps) {
    const {children, sx, ...other} = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <div>
            <EvamTabContext.Consumer>
                {context => {
                    if (!context.isMenuOpen) setAnchorEl(null)
                    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                        context.setIsMenuOpen(true)
                        setAnchorEl(event.currentTarget);
                    };
                    const open = Boolean(anchorEl);
                    return (
                        <div>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <Grid padding={"0px"} container
                                      spacing={0}
                                      height={96}
                                      width={96}
                                      direction="column"
                                      alignItems="center"
                                      justifyContent="center">
                                    <MenuIcon sx={{color: "white"}} fontSize={"large"}/>
                                </Grid>
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                keepMounted={true}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={sx}
                                {...other}
                            >
                                {children}
                            </StyledMenu>
                        </div>
                    )
                }}
            </EvamTabContext.Consumer>


        </div>
    );

}