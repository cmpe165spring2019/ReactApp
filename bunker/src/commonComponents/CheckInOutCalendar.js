import React from 'react'

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
initialDate={defaultDateRange}
dateFormat="MM-DD-YYYY"
onChange={props.onChange}
value={props.value}
icon="bullhorn"
iconPosition="left"
placeholder="From - To"
/>
)

export default CheckInOutCalendar;