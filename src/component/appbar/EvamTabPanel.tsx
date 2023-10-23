import * as React from "react";
import {EvamTabContext} from "./EvamTabContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Slide} from "@mui/material";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
}

function getDirection(activeTabId: number, subTabId: number, previousActiveTabId: number){
    let direction: "right" | "left";
    if (activeTabId === subTabId){
        // Completed animation, new panel comes in
        // If new value > previous, panel comes from right, so it goes left
        direction = (activeTabId > previousActiveTabId) ? "left" : "right"
    } else {
        // Initiate animation, old panel comes out
        // If new value > previous, panel exits on the left, so it goes right
        direction = (subTabId > previousActiveTabId) ? "right" : "left"
    }

    return direction
}

/**
 * Tab panel component that contains the content associated with a tab
 */
export function EvamTabPanel(props: TabPanelProps) {
    const {children, index, ...other} = props;

    return (
        <EvamTabContext.Consumer>
            {context =>
                <div
                    role="tabpanel"
                    hidden={context.activeTabId !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                >
                    {context.activeTabId === index && (
                        <Box sx={{p: 3}}>
                            <Slide direction={getDirection(context.activeTabId, context.subTabId, context.previousActiveTabId)}
                                   in={context.subTabId === index}
                                   mountOnEnter unmountOnExit>
                                <div>
                                    {children}
                                </div>
                            </Slide>
                        </Box>)}

                </div>
            }
        </EvamTabContext.Consumer>
    );
}