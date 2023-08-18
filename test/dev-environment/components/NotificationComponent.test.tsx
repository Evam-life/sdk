import {Notification, NotificationType} from "../../../src";
import {EvamApi} from "../../../src";
import {Button} from "@chakra-ui/react";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import crypto from "crypto";
import {VehicleServicesDevelopmentEnvironment} from "../../../src/dev-test-environment";

class TestApi extends EvamApi {
    constructor() {
        super();
    }

}

Object.defineProperty(globalThis, "crypto", {
    value: {
        getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
    }
});

describe("NotificationComponent", () => {

    const api = new TestApi();

    afterEach(() => {
        cleanup();
    });

    const notification: Notification = Notification.fromJSON({
        heading: "Notification Heading",
        description: "Notification Description",
        notificationType: NotificationType.ACTION_HUN,
        primaryButton: {
            label: "Primary Button",
            callback: () => {
                console.log("Primary Button Clicked");
            }
        },
        secondaryButton: {
            label: "Secondary Button",
            callback: () => {
                console.log("Secondary Button Clicked");
            }
        }
    });

    const onClickHandler = () => {
        if (notification.secondaryButton !== undefined && notification.secondaryButton.label === "") {
            notification.secondaryButton = undefined;
        }
        api.sendNotification(notification);
    };

    const queryByRoleButtonText = "Use this text to locate button in dom";

    const DOM = () => {
        return <VehicleServicesDevelopmentEnvironment>
            <Button onClick={onClickHandler}>
                {queryByRoleButtonText}
            </Button>
        </VehicleServicesDevelopmentEnvironment>;
    };

    beforeEach(() => {
        render(<DOM/>);
    });


    it("shows a notification when the Button in clicked(which trigger EvamApi.sendNotification) method", async () => {
        const sendNotificationSpy = jest.spyOn(api, "sendNotification");

        const button = screen.queryByRole("button", {
            name: queryByRoleButtonText
        });

        expect(sendNotificationSpy).not.toHaveBeenCalled();
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            expect(sendNotificationSpy).toHaveBeenCalled();
        });

        await waitFor(() => {
            const notificationComponentDescription = screen.queryByText(notification.description);
            expect(notificationComponentDescription).toBeInTheDocument();
        });

        await waitFor(() => {
            const notificationComponentPrimaryButton = screen.queryByText(notification.primaryButton.label);
            expect(notificationComponentPrimaryButton).toBeInTheDocument();
        });

        await waitFor(() => {
            const notificationComponentSecondaryButton = screen.queryByText(notification.secondaryButton.label);
            expect(notificationComponentSecondaryButton).toBeInTheDocument();
        });

    });

    it("makes the notification vanish when primary button is clicked", async () => {

        const button = screen.queryByRole("button", {
            name: queryByRoleButtonText
        });
        fireEvent.click(button);

        await waitFor(() => {
            const primaryButton = screen.queryByText(notification.primaryButton.label);
            expect(primaryButton).toBeInTheDocument();
            if (primaryButton !== null) {
                fireEvent.click(primaryButton);
            }
        });

        await waitFor(() => {
            const notificationComponentHeading = screen.queryByText(notification.heading);
            expect(notificationComponentHeading).not.toBeInTheDocument();
        });

        await waitFor(() => {
            const notificationComponentDescription = screen.queryByText(notification.description);
            expect(notificationComponentDescription).not.toBeInTheDocument();
        });

        await waitFor(() => {
            const notificationComponentPrimaryButton = screen.queryByText(notification.primaryButton.label);
            expect(notificationComponentPrimaryButton).not.toBeInTheDocument();
        });

        await waitFor(() => {
            const notificationComponentSecondaryButton = screen.queryByText(notification.secondaryButton.label);
            expect(notificationComponentSecondaryButton).not.toBeInTheDocument();
        });
    });

    it('triggers the primary callback when the primary button is clicked', async () => {

        /**
         * This test doesn't utilise Jest's spyOn function because when EvamApi stores the callback it's a copy of the
         * callback and not the original callback itself. Therefore, notification.primaryButton.callback is never actually called but a
         * copy of it is. This unit test tests the result of that callback by changing a variable scoped to this test.
         */

        const button = screen.queryByRole("button", {
            name: queryByRoleButtonText
        });

        let x = 1;

        expect(x).toEqual(1);

        const saveCallback = notification.primaryButton.callback;

        notification.primaryButton.callback = () => {
            x += 1;
        }

        expect(x).not.toEqual(2);
        fireEvent.click(button);


        await waitFor(() => {
            const primaryButton = screen.queryByText(notification.primaryButton.label);
            if (primaryButton !== null) {
                fireEvent.click(primaryButton);
            }
        });

        await waitFor(()=>{
            expect(x).toEqual(2);
        })

        notification.primaryButton.callback = saveCallback; //<-- just incase I want to write more tests. The callback is restored.
    })
});