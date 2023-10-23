import {EvamAppBarLayout} from "../../src/component/appbar/EvamAppBarLayout";
import {render, screen} from "@testing-library/react";
import {EvamTabs} from "../../src/component/appbar/EvamTabs";
import {EvamTab} from "../../src/component/appbar/EvamTab";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {EvamTabPanel} from "../../src/component/appbar/EvamTabPanel";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import {clickButton} from "../testutils/clickButton";

// A basic test application
function TestApp() {
    return (
            <Router>
                <EvamAppBarLayout tabs={
                    <EvamTabs>
                        <EvamTab label={"Tab 0"} index={0} icon={<Home/>}/>
                        <EvamTab label={"Tab 1"} index={1} icon={<Home/>}/>
                    </EvamTabs>
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
                    </Routes>
                </EvamAppBarLayout>
            </Router>
    )
}

test("Clicking tabs should switch panels",  async () => {
    const dom = render(<TestApp/>);
    window.HTMLElement.prototype.scrollTo = function() {};

    // Get active panel, verify it is the default one (0)
    let panel = screen.getByRole("tabpanel")
    expect(panel).toHaveTextContent("Panel 0")
    expect(panel).not.toHaveTextContent("Panel 1")

    // Move to panel 1
    await clickButton(dom, dom.queryByText("Tab 1"), 1000)

    // Check we are at panel 1
    let panel2 = screen.getByRole("tabpanel")
    expect(panel2).toHaveTextContent("Panel 1")
    expect(panel2).not.toHaveTextContent("Panel 0")

    // Move to panel 0
    await clickButton(dom, dom.queryByText("Tab 0"), 1000)

    // Check we are at panel 1
    let panel3 = screen.getByRole("tabpanel")
    expect(panel3).toHaveTextContent("Panel 0")
    expect(panel3).not.toHaveTextContent("Panel 1")
})