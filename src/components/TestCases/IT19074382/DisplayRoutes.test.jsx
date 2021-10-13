import React from 'react';
import { render } from '@testing-library/react';
import HomeRoute from "../../Passenger/Home/HomeRoute";

//Test case Pass
describe("HomeRoute page Renders without Crashing" , () => {

    test("HomeRoute page Renders without Crashing", () => {
        const {container} = render(<HomeRoute/>);
        console.log(container.outerHTML);
    })

})
