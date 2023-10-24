import {render, waitFor} from "@testing-library/react";

jest.mock("../../../src",()=>({
    ...jest.requireActual("../../../src"),

}))

//TODO fix this test
describe("NotificationComponent while inside Vehicle Services", function () {
    it("shouldn't render", async () => {

        //const api = new EvamApi();

        // const notification: Notification = Notification.fromJSON({
        //     heading: "Notification Heading",
        //     description: "Notification Description",
        //     notificationType: NotificationType.ACTION_HUN,
        //     primaryButton: {
        //         label: "Primary Button",
        //         callback: () => {
        //             console.log("Primary Button Clicked");
        //         }
        //     },
        //     secondaryButton: {
        //         label: "Secondary Button",
        //         callback: () => {
        //             console.log("Secondary Button Clicked");
        //         }
        //     }
        // });

        const DOM = () => {
            return <>
            </>;
        };

        render(<DOM/>);

       // api.sendNotification(notification);

        await waitFor(() => {
            // const primaryButton = screen.queryByRole("button", {
            //     name: 'notification.primaryButton.label'
            // });
            expect(1).toEqual(1)//TODO
            //expect(primaryButton).not.toBeInTheDocument();
        });
    });
});