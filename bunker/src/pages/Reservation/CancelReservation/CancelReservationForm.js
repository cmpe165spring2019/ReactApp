import React from "react";
import { Grid,Header,Icon,Card} from "semantic-ui-react";
const CancelReservationForm = props => {
	const {
		reservation,
		hotel,
	} = props;

	return (
		<Card color="red" centered>

          <Icon name="paper plane" size="large"/>
					
				 <h3><i>
				 Total Payment: ${reservation.data.price}
				</i> </h3>



		</Card>
	);
};

export default CancelReservationForm;
