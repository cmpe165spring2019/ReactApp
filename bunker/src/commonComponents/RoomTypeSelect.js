import React from 'react';

import { Select } from 'semantic-ui-react';

const roomTypeOptions = [
    {
        key: 'single',
        text: 'Single-Person',
        value: 'single'
    },
    {
        key: 'double',
        text: 'Double-Person',
        value: 'double'
    },
    {
        key: 'multiple',
        text: 'Multiple-Person',
        value: 'multiple'
    }
];

const RoomTypeSelect = (props) => (
    <Select
    compact
    name={props.name || "roomType"}
    placeholder=''
    options={roomTypeOptions}
    onChange={props.onChange}
    defaultValue={props.defaultValue}
    />
)

export default RoomTypeSelect;
