import React, {ReactNode} from "react";

/**
 * Context data model for the Evam App bar component
 */
export class EvamAppBarContextModel {
    constructor(
        public activeTabId: number,
        public previousActiveTabId: number,
        public subTabId: number,
        private setActiveTabId: (_: number) => void,
        private setPreviousActiveTabId: (_: number) => void,
        private setSubTabId: (_: number) => void,
        public specialComponent: React.ReactNode | null,
        public setSpecialComponent: (_: React.ReactNode) => void,
        public isMenuOpen: boolean,
        public setIsMenuOpen: (_: boolean) => void
    ) {
    }

    private setDelay(ms: number): Promise<void> {
        return new Promise(res => setTimeout(res, ms));
    }

    public setActiveTab(id: number) {
        this.setDelay(50).then(
            () => {
                this.setPreviousActiveTabId(this.activeTabId)
                this.setSubTabId(id)

                this.setDelay(150).then(
                    () => {

                        window.scrollTo({top: 0})
                        this.setActiveTabId(id)
                    }
                )
            }
        )
    }

    public handleChange(event: React.SyntheticEvent, newValue: number){
        this.setActiveTab(newValue)
    }


}

export const DEFAULT_EVAM_TAB_CONTEXT = new EvamAppBarContextModel(
    0,
    0,
    0,
    (arg0: number) => {console.log(arg0)},
    (arg0: number) => {console.log(arg0)},
    (arg0: number) => {console.log(arg0)},
    null,
    (arg0: ReactNode) => {console.log(arg0)},
    false, (arg0: boolean) => {console.log(arg0)},
)

export const EvamTabContext = React.createContext(
    DEFAULT_EVAM_TAB_CONTEXT
)