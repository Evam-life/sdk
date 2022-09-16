import {act, Matcher, QueryByText, RenderResult} from "@testing-library/react";

export async function clickButton(dom: RenderResult, button:  ReturnType<QueryByText<HTMLElement>>,
                                  delay: number) {
    // Move to panel 0
    act( () => {
        button.click()
    })
    // Wait for animation
    await new Promise((r) => setTimeout(r, delay));

}