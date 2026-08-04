import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { FiMoreVertical } from 'react-icons/fi'

// Row action menu used inside the admin tables.
// `items` = [{ label, icon, danger, onClick }]
const TableDropdown = ({ items = [] }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as="button" type="button">
                <FiMoreVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {items.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        as="button"
                        type="button"
                        className={item.danger ? "del-color" : ""}
                        onClick={item.onClick}
                    >
                        {item.icon}
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TableDropdown
