import React from 'react'

import {
    Label,
    Select
} from './SelectOption.styles'

interface SelectOptionProps {
    label: string;
    options: { value: string; text: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedOption?: string;
    width?: string;
    height?: string;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ label, options, onChange, selectedOption, width, height}) => {
    return (
        <Label width={width} height={height}>
            {" " + label}
            <Select onChange={onChange} value={selectedOption}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </Select>
        </Label>
    );
}

export default SelectOption;