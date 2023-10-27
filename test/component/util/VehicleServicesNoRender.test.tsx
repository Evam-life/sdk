import {cleanup, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"
import {VehicleServicesNoRender} from "../../../src/dev-test-environment/components";
import {EvamApi} from "../../../src";

jest.mock("../../../src/api/EvamApi", ()=>({
    EvamApi: {
        isRunningInVehicleServices: true
    }
}))


describe('VehicleServicesNoRender', () => {
    it('should not render in vehicle services', async () => {
        expect(EvamApi.isRunningInVehicleServices).toEqual(true)

        const buttonName = 'name'
        const ButtonToFind = () => <button>
            {buttonName}
        </button>

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