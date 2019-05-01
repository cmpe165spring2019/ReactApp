import React from 'react';

import { DatesRangeInput } from "semantic-ui-calendar-react";
import * as moment from 'moment';


const today=moment().format('MM-DD-YYYY');
const aWeekFromToday = moment().add(5, 'days').format('MM-DD-YYYY');
const defaultDateRangeArray = [today, aWeekFromToday];
const defaultDateRange = defaultDateRangeArray.join(" - ");

const CheckInOutCalendar = (props) => (
    <DatesRangeInput
    name="datesRange"
    minDate={today}
    dateFormat="MM-DD-YYYY"
    onChange={props.onChange}
    value={props.value}
    iconPosition="left"
    placeholder="From - To"
    style={{"width": "220px"}}
    />
)

export default CheckInOutCalendar;
