import React from 'react';
import { render } from '@testing-library/react';
import BookingPage from "../../Passenger/BookingPage/BookingPage";

//Test case Pass
describe("BookingPage Renders without Crashing" , () => {

    test("BookingPage Renders without Crashing", () => {
        const {container} = render(<BookingPage/>);
        console.log(container.outerHTML);
    })

})
