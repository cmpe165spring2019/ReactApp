import React from 'react'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'

const HotelCard = (props) => (
    <Card fluid>
      <Image src= {props.hotelImage} />
      <Card.Content>
        <Card.Header>{props.hotelName}
        </Card.Header>
        <Card.Meta>{props.hotelCity}</Card.Meta>
        <Card.Description>{props.hotelDescription}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid.Column floated='left'>
            <Icon name='dollar sign' />
            {props.hotelPrice}   
        </Grid.Column>
        <Grid.Column floated='right'>
          <Icon name='star' />
          {props.hotelRating}
        </Grid.Column>
      </Card.Content>
    </Card>
)

  export default HotelCard;