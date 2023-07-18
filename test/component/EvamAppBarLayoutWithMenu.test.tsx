import {EvamAppBarLayout} from "../../src/component/appbar/EvamAppBarLayout";
import {
    act,
    fireEvent,
    getByText,
    render,
    screen
} from '@testing-library/react';
import {EvamTabs} from "../../src/component/appbar/EvamTabs";
import {EvamTab} from "../../src/component/appbar/EvamTab";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {EvamTabPanel} from "../../src/component/appbar/EvamTabPanel";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import {clickButton} from "../testutils/clickButton";
import {
    EvamSearchInput
} from "../../src/component/appbar/header/EvamSearchInput";
import {EvamTabSearch} from "../../src/component/appbar/EvamTabSearch";
import {EvamHamburgerMenu} from "../../src/component/appbar/EvamHamburgerMenu";
import Box from "@mui/material/Box";
import {EvamMenuItem} from "../../src/component/appbar/EvamMenuItem";
import {
    formatRoutePathByMenuId
} from "../../src/component/appbar/utils/formatRoutePathByMenuId";

// A basic test application with Search
function TestApp() {
    return (
        <div className="App">
            <Router>
                <EvamAppBarLayout tabs={
                    <EvamTabs>
                        <EvamTab label={"Tab 0"} index={0} icon={<Home/>}/>
                        <EvamTab label={"Tab 1"} index={1} icon={<Home/>}/>
                    </EvamTabs>
                } extraFunction={
                    <EvamHamburgerMenu  sx={{backdropFilter: "blur(5px)"}}>
                        <Box height={600} width={500}>
                            <EvamMenuItem id={"menuoption1"}>Menu option 1</EvamMenuItem>
                            <EvamMenuItem id={"menuoption2"}>Menu option 2</EvamMenuItem>
                        </Box>
                    </EvamHamburgerMenu>
                }>
                    <Routes>
                        <Route path={"/"} element={
                            <React.Fragment>
                                <EvamTabPanel index={0}>
                                    <h1>Panel 0</h1>
                                    <p>Lorem ipsum</p>
                                </EvamTabPanel>
                                <EvamTabPanel index={1}>
                                    <h1>Panel 1</h1>
                                    <p>Dolor sit amet</p>
                                </EvamTabPanel>
                            </React.Fragment>
                        }/>
                        <Route
                            path={formatRoutePathByMenuId("menuoption1")}
                            element={<h1>Hamburger 1</h1>}/>
                        <Route
                            path={formatRoutePathByMenuId("menuoption2")}
                            element={<h1>Option 2</h1>}/>
                    </Routes>
                </EvamAppBarLayout>
            </Router>
        </div>
    )
}

test("Clicking Hamburger menu should navigate to menus",  async () => {
    const dom = render(<TestApp/>);
    window.HTMLElement.prototype.scrollTo = function() {};

    // Get menu button and click it
    await clickButton(dom, dom.queryByRole("button"), 500)
    let menuOption = screen.getByText("Menu option 1")
    await clickButton(dom, menuOption, 1000)
    screen.debug()

    let view = screen.getByText("Hamburger 1")
    expect(view).toHaveTextContent("Hamburger 1")
})