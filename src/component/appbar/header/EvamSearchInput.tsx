import {Input} from "@mui/material";
import * as React from "react";
import {Fragment, useRef} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

interface EvamSearchInputProps {
    searchTextHint: string
}

const useFocus = () => {
    const htmlElRef = useRef<HTMLElement | null>(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
}

/**
 * Input component for the Evam Search function
 * @param props component props
 * @constructor
 */
export function EvamSearchInput(props: EvamSearchInputProps) {
    const {searchTextHint, ...other} = props
    useNavigate();
    const [inputRef] = useFocus()
    const [params, setParams] = useSearchParams()

    return (
        <Fragment>
            <Input autoFocus={true} size={"medium"}
                   sx={{fontSize: 24, textDecoration: "none"}}
                   {...other}
                   ref={inputRef}
                   placeholder={searchTextHint} fullWidth={true}
                   value={params.get("searchText")}
                   onChange={(e) => {
                       setParams({
                           searchText: e.target.value
                       })
                   }}
                   onKeyDown={(k) => {
                       if (k.key === 'Enter') {
                           k.currentTarget.blur()
                           k.preventDefault()
                       }
                   }}
            ></Input>
        </Fragment>

    )
}