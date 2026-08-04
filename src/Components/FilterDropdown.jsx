import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const FilterDropdown = ({
    value,
    onChange,
    options,
    placeholder = "Select"
}) => {
    const selected = options.find(item => item.value === value);

    return (
        <div className="custom-dropdown-inbox">
            <Dropdown onSelect={(key) => onChange(key)}>
                <Dropdown.Toggle as="button" type="button">
                    {selected ? selected.label : placeholder}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {options.map(item => (
                        <Dropdown.Item
                            key={item.value}
                            as="button"
                            type="button"
                            eventKey={item.value}
                            active={item.value === value}
                        >
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default FilterDropdown
