import React from 'react';
import { render } from '@testing-library/react';
import ManageDetails from "../../TransportManager/Routes/ManageDetails";

//Test case Pass
describe("ManageDetails page Renders without Crashing" , () => {

    test("ManageDetails page Renders without Crashing", () => {
        const {container} = render(<ManageDetails/>);
        console.log(container.outerHTML);
    })

})
