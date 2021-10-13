import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../Public/Login/Login";

//Test case Pass
describe("Login page Renders without Crashing" , () => {

    test("Login page Renders without Crashing", () => {
        const {container} = render(<Login/>);
        console.log(container.outerHTML);
    })

})
