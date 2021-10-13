import React from 'react';
import { render } from '@testing-library/react';
import Account from "../../Passenger/PassengerAccount/Account";

//Test case Pass
describe("Account page Renders without Crashing" , () => {

    test("Account page Renders without Crashing", () => {
        const {container} = render(<Account/>);
        console.log(container.outerHTML);
    })

})
