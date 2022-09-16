import * as React from "react";
import Tabs from "@mui/material/Tabs";
import {EvamTabContext} from "./EvamTabContext";

interface EvamTabsProps {
    children: React.ReactNode;
}

/**
 * Evam tab group component that contains several EvamTab components
 * @param props component props
 * @constructor
 */
export function EvamTabs(props: EvamTabsProps) {
    const {children, ...other} = props;
    return (
        <EvamTabContext.Consumer>
            {context =>
                <Tabs value={context.activeTabId}
                      {...other}
                      onChange={
                          (e, val) => {
                              context.handleChange(e, val)
                          }
                      }
                      aria-label="evam tabs">
                    {children}
                </Tabs>
            }

        </EvamTabContext.Consumer>

    )
}