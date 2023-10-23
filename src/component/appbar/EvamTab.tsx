import Tab from "@mui/material/Tab";
import * as React from "react";

/**
 * Props for EvamTab
 */
interface EvamTabProps {
    icon?: string | React.ReactElement;
    label: string;
    index: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

/**
 * Tab component inside the EvamTabs component
 * @param props Component props
 */
export function EvamTab(props: EvamTabProps) {
    const {icon, label, index, ...other} = props

    return (
        <Tab
            sx={{textTransform: "none", color: "text.secondary",
                height: 96, minWidth: 156, fontSize: 24
            }}
            centerRipple={true}
            icon={icon}
            label={label}
            {...other}
            {...a11yProps(index)}
        />
    )
}