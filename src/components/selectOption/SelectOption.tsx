import React from 'react'

import {
    Label,
    Select
} from './SelectOption.styles'

interface SelectOptionProps {
    label: string;
    options: { value: string; text: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ label, options, onChange }) => {
    return (
        <Label>
            {label}
            <Select onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
                defaultValue={options[0].value}
            </Select>
        </Label>
    );
}

export default SelectOption;