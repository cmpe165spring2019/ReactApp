import React from 'react'
import { Grid, Card, Icon, Image, Segment, List, Divider } from 'semantic-ui-react'

const HotelCard = (props) => {
  const {image, name, currentRoomPrice, address, rating, details} = props.hotel.data;
  return (
    <Card fluid>
      <Image src= {image[0]} />
      <Card.Content>
        <Card.Header>{name}
        </Card.Header>
        <Card.Meta>{`${address.city}, ${address.country}`}</Card.Meta>
        <Card.Description>
          <Segment>
            <List bulleted>
              {details.split(", ").slice(0,5).map(item => (
                <List.Item>{item}
                </List.Item>
              ))}
            </List>
          </Segment>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid.Column floated='left'>
            <Icon name='dollar sign'/>
            <font size="+0.5">{currentRoomPrice} / night</font>
        </Grid.Column>
        <Grid.Column floated='right'>
          <Icon name='star' color='yellow' />
          {rating}
        </Grid.Column>
      </Card.Content>
    </Card>
)}

  export default HotelCard;
