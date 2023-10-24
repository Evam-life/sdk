import {cleanup, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"
import {EvamApi} from "../../../src";
import {VehicleServicesNoRender} from "../../../src/dev-test-environment/components";

jest.mock("../../../src", ()=>({
    EvamApi: {
        isRunningInVehicleServices: true
    }
}))


describe('VehicleServicesNoRender', () => {
    it('should not render in vehicle services', async() => {
        expect(EvamApi.isRunningInVehicleServices).toEqual(true)

        const buttonName = 'name'
        const ButtonToFind = () => <button>
            {buttonName}
        </button>

        render(<ButtonToFind/>)

        const buttonInDom = await screen.queryByRole('button',{
            name: buttonName
        })

        expect(buttonInDom).toBeInTheDocument()

        cleanup()

        const Component = () => <VehicleServicesNoRender>
            <ButtonToFind/>
        </VehicleServicesNoRender>

        render(<Component/>)

        const buttonWithWrappingVehicleServicesNoRender = await screen.queryByRole('button',{
            name: buttonName
        })

        expect(buttonWithWrappingVehicleServicesNoRender).not.toBeInTheDocument()


    })
})