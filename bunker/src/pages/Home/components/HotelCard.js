import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const HotelCard = (props) => (
    <Card>
      <Image src= {props.hotelImage} />
      <Card.Content>
        <Card.Header>{props.hotelTitle}</Card.Header>
        <Card.Meta>{props.hotelCity}</Card.Meta>
        <Card.Description>{props.hotelDescription}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
            <Icon name='dollar sign' />
            {props.hotelPrice}
        </a>
         | 
        <a>
          <Icon name='star' />
          {props.hotelRating}
        </a>
      </Card.Content>
    </Card>
  )

  export default HotelCard;