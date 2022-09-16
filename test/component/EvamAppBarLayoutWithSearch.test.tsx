import {EvamAppBarLayout} from "../../sdk/component/appbar/EvamAppBarLayout";
import {
    act,
    fireEvent,
    getByText,
    render,
    screen
} from '@testing-library/react';
import {EvamTabs} from "../../sdk/component/appbar/EvamTabs";
import {EvamTab} from "../../sdk/component/appbar/EvamTab";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {EvamTabPanel} from "../../sdk/component/appbar/EvamTabPanel";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import {clickButton} from "../testutils/clickButton";
import {
    EvamSearchInput
} from "../../sdk/component/appbar/header/EvamSearchInput";
import {EvamTabSearch} from "../../sdk/component/appbar/EvamTabSearch";

// A basic test application with Search
function TestApp() {
    return (
            <Router>
                <EvamAppBarLayout tabs={
                    <EvamTabs>
                        <EvamTab label={"Tab 0"} index={0} icon={<Home/>}/>
                        <EvamTab label={"Tab 1"} index={1} icon={<Home/>}/>
                    </EvamTabs>
                } extraFunction={<EvamTabSearch/>}>
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
                        <Route path={"/search"} element={
                            <React.Fragment>
                                <h1>Search view</h1>
                            </React.Fragment>
                        }/>
                    </Routes>
                </EvamAppBarLayout>
            </Router>
    )
}

test("Clicking Search should navigate to /search",  async () => {
    const dom = render(<TestApp/>);
    window.HTMLElement.prototype.scrollTo = function() {};

    // Get search button and click it
    await clickButton(dom, dom.queryByRole("button"), 500)

    // Check we are in search view
    let view = screen.getByText("Search view")
    expect(view).toHaveTextContent("Search view")

    // Write search query
    let input = screen.getByPlaceholderText("Search")
    fireEvent.change(input, {target:{value:"search test"}})

    // Check the query params are updated
    expect(window.location.search).toEqual("?searchText=search+test")
})