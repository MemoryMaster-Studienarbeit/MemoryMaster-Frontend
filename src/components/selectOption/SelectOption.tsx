import React from 'react'

import {
    Label,
    Select
} from './SelectOption.styles'

interface SelectOptionProps {
    label: string;
    options: { value: string; text: string }[];
}

export const SelectOption: React.FC<SelectOptionProps> = ({ label, options }) => {
    return (
        <Label>
            {label}
            <Select>
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