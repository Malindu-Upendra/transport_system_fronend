import React from 'react';
import { render } from '@testing-library/react';
import Header from "../../Public/Header/Header";

//Test case Pass
describe("Header page Renders without Crashing" , () => {

    test("Header page Renders without Crashing", () => {
        const {container} = render(<Header/>);
        console.log(container.outerHTML);
    })

})
