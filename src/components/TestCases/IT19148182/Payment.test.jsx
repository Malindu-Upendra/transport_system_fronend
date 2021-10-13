import React from 'react';
import { render } from '@testing-library/react';
import Payment from "../../Passenger/Payment/Payment";

//Test case Pass
describe("Payment page Renders without Crashing" , () => {

    test("Payment page Renders without Crashing", () => {
        const {container} = render(<Payment/>);
        console.log(container.outerHTML);
    })

})
