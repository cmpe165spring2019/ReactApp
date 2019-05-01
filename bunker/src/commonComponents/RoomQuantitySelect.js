import React from 'react';

import { Dropdown } from 'semantic-ui-react';

import * as util from 'util' // has no default export


const RoomQuantitySelect = (props) => {
    // console.log('props: ' + typeof(Integer(props.defaultValue)));

    let roomQuantityOptions = [];
    for(let i = 1; i < 17; i++){
        let obj = {
            key: i,
            text: i,
            value: i
        };
        roomQuantityOptions.push(obj);
    }

    return(
    <Dropdown
    compact
    selection
    name="roomQuantity"
    placeholder=''
    options={roomQuantityOptions}
    onChange={props.onChange}
    defaultValue={props.defaultValue}
    />
    )
}

export default RoomQuantitySelect;
