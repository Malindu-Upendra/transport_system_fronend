import React from 'react';
import { render } from '@testing-library/react';
import Register from "../../Public/Register/Register";

//Test case Pass
describe("Register page Renders without Crashing" , () => {

    test("Register page Renders without Crashing", () => {
        const {container} = render(<Register/>);
        console.log(container.outerHTML);
    })

})
