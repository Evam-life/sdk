import * as React from "react";
import {Fragment, ReactNode, useRef} from "react";
import {Button, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {EvamAppBarContextModel, EvamTabContext} from "./EvamTabContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import {EvamAppBarHeaderTabs} from "./header/EvamAppBarHeaderTabs";
import {EvamAppBarHeaderMenu} from "./header/EvamAppBarHeaderMenu";
import {Close} from "@mui/icons-material";
import {EvamAppBarHeaderWithBackButton} from "./header/EvamAppBarHeaderWithBackButton";
import {EvamSearchInput} from "./header/EvamSearchInput";

interface EvamTabMenuLayoutProps {
    children: React.ReactNode;
    tabs: React.ReactNode;
    extraFunction?: React.ReactElement;
    searchHint?: string
    showSearchCancel?: boolean
}

/**
 * Evam App bar layout, basis for applications using the App bar component
 * @param props Props for the component
 * @constructor
 */
export function EvamAppBarLayout(props: EvamTabMenuLayoutProps) {
    const {children, tabs, extraFunction, searchHint, showSearchCancel, ...other} = props

    const [activeTabId, setActiveTabId] = React.useState(0)
    const [subTabId, setSubTabId] = React.useState(0)
    const [previousTabId, setPreviousSubTabId] = React.useState(0)
    const [specialComponent, setSpecialComponent] = React.useState<ReactNode>(null)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const context = new EvamAppBarContextModel(
        activeTabId,
        previousTabId,
        subTabId,
        setActiveTabId,
        setPreviousSubTabId,
        setSubTabId,
        specialComponent,
        setSpecialComponent,
        isMenuOpen,
        setIsMenuOpen
    )

    const searchTextHint = (searchHint) ? searchHint : "Search"
    const showCancel = (showSearchCancel != null) ? showSearchCancel : false
    const navigate = useNavigate()
    const ref = useRef<HTMLElement>()

    ref.current?.scrollTo(0,0)

    return (
        <EvamTabContext.Provider value={context}>
            <Box sx={{
                borderBottom: 1, borderColor: 'divider', position: "fixed", top: 0,
                zIndex: 999, backgroundColor: "#000000",
                width: "100%"
            }}>

                <Routes>
                    <Route path={"/"} element={
                        <Fragment>
                            <EvamAppBarHeaderTabs special={extraFunction}>
                                {tabs}
                            </EvamAppBarHeaderTabs>
                        </Fragment>

                    }/>
                    <Route path={"/search"} element={
                        // <EvamSearchBar showCancel={showCancel} searchTextHint={searchTextHint}/>
                        <EvamAppBarHeaderWithBackButton special={
                            (showCancel) ?
                                <Button onClick={
                                    () => navigate("/search?searchText=")
                                }>

                                    <Grid padding={"1px"} container
                                          spacing={0}
                                          height={96}
                                          width={96}
                                          direction="column"
                                          alignItems="center"
                                          justifyContent="center">
                                        <Close sx={{color: 'white', height: 96}} fontSize={"large"}></Close>


                                    </Grid>
                                </Button>

                                : undefined
                        }>
                            <EvamSearchInput searchTextHint={searchTextHint}/>
                        </EvamAppBarHeaderWithBackButton>
                    }/>
                    <Route path={"/hmenu/:menuId"} element={
                        <EvamAppBarHeaderMenu special={extraFunction}/>
                    }/>

                </Routes>

            </Box>
            <Box ref={ref} sx={{width: '100%', marginTop: "96px", overflowX: "hidden"}} {...other}>

                {children}
            </Box>
        </EvamTabContext.Provider>
    )

}