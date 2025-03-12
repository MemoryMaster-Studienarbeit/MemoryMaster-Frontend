import React from "react";
import {SpinnerDiv, Svg, Circle} from "./Spinner.styles";

const Spinner = () => {
    return (
        <SpinnerDiv>
            <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <Circle cx="50" cy="50" r="25"/>
            </Svg>
        </SpinnerDiv>
    )
}

export default Spinner;