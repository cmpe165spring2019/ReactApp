import React from 'react';

import { Dropdown } from 'semantic-ui-react';

const createRoomQuantityOptions = () => {
    let roomQuantityOptions = [];
    for(let i = 0; i < 17; i++){
        let obj = {
            key: i,
            text: i,
            value: i
        };
        roomQuantityOptions.push(obj);
    }
    return roomQuantityOptions;
}

const roomQuantityOptions = createRoomQuantityOptions();

const RoomQuantitySelect = (props) => (
    <Dropdown
    compact
    selection
    name="roomQuantity"
    placeholder=''
    options={roomQuantityOptions}
    onChange={props.onChange}
    defaultValue={1}
/>
)

export default RoomQuantitySelect;