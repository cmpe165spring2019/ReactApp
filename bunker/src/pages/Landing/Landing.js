import React from 'react';
import Background from '../../images/LandingBackground.jpg';
// import BunkerImage from '../../../public/bunkertransparent.png';
    import {Form, Select} from 'semantic-ui-react';


import * as ROUTES from '../../constants/routes';
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import * as moment from "moment";
import { DateInput } from "semantic-ui-calendar-react";


const today=moment().format('MM-DD-YYYY');
const tommorrow=moment().add(1,'days').format('MM-DD-YYYY');

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dateIn:'',
            dateOut:'',
            maxCheckIn: '',
            minCheckout:tommorrow,
            i : 0,
            maintxt :'Decentralized Certificates on the Ethereum Blockchain',
            speed : 100,
            displaytxt: '',
            tmpTitle: 'Make your first reservation with Bunker!',
            fullTitle: 'Make your first reservation with Bunker!',
            j: 0

        }
        const spinner = document.getElementById('spinner');

        if (spinner && !spinner.hasAttribute('hidden')) {
            spinner.setAttribute('hidden', 'true');
        }

    }
    handleCheckInDate=(event,{name,value})=>{

        let parts=value.split("-");
        let dt=new Date(parseInt(parts[2]),parseInt(parts[0]-1),parseInt(parts[1]));

        let date=moment(dt).add(1,'days').format('MM-DD-YYYY');
        console.log(date);
        if(this.state.hasOwnProperty(name)){
            console.log("good1")
            this.setState({[name]:value,minCheckout:date});
        }
    }
    handleCheckOutDate=(event,{name,value})=>{
        console.log("good2");
        let parts=value.split("-");
        let dt=new Date(parseInt(parts[2]),parseInt(parts[0]-1),parseInt(parts[1]));
        let date=moment(dt).subtract(1,'days').format('MM-DD-YYYY');
        if(this.state.hasOwnProperty(name)){
            console.log("good3");
            this.setState({[name]:value,maxCheckIn:date});
        }
    }

    onClick = () => {
        // this.props.firebase.hotelFilter(this.state.location)
    // .then( (hotels) =>{
        this.props.history.push({
            pathname: ROUTES.HOME,
            state: {...this.state}
        })
    // });
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            if (this.state.i < this.state.maintxt.length) {
                let newI = this.state.i+1;
                this.setState({ i: newI });
            }
            //     else{
            //         console.log("eh");
            //           this.setState({i:0});
            // }
        }, 50);
        this.timeout = setInterval(() => {
            if(this.state.j < this.state.tmpTitle.length){
                let newJ = this.state.j+1;
                this.setState({ j: newJ });
            }
            //     else{
            //         console.log("eh");
            //           this.setState({i:0});
            // }
        }, 65);
    }
    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    goTo(event){
        var destination = event.target.value;
        this.props.history.push(`/${destination}`);
    }

    render() {
        let displaytext = this.state.maintxt.substring(0,this.state.i);
        let displayTitle ='';
        if(this.state.j >= this.state.tmpTitle.length){
            displayTitle = this.state.fullTitle;
        }else{
            displayTitle = this.state.tmpTitle.substring(0,this.state.j);
        }
        return(
  <div style={backgroundStyle}>
      <div style={bunkerStyle}>
          {/*<img src={BunkerImage} width="300" height="300" />*/}
      </div>
      <div style={boxStyle}>
          <div style={introDiv}>
              <h1 style={introD}>{displayTitle}</h1>
          </div>
          
      </div>
  </div>
);
}}
const GuestNum = () => {
    let Guests = [];
    for (var i = 1; i < 6; i++) {
        let obj = {
            key: i,
            text: i,
            value: i
        };
        Guests.push(obj);
    }
    return (
        <Select icon="user" iconPosition="left" options={Guests} />
    );
}
const bunkerStyle = {
    margin: "auto",
    width: "300px",
    height: "200px",
};
const introDiv = {
    margin:"20px auto 0 auto ",
    width:"360px",
    height: "70px",
    // color: 'white'
}
const introD = {
    width:"360px",
    height: "70px",
    fontcolor:"grey",
}
const Place = {
    margin:"20px auto 0 auto ",
    width:"360px",
};
const InOutDiv = {
    width:"360px",
    margin:"20px auto 0 auto ",
    height: "60px",
}
const CheckIn = {
    float:'left',
    width:"180px",
};
const CheckOut = {
    float:'left',
    width:"180px",
};
const Guests = {
    margin:"20px auto 0 auto ",
    width:"360px",
};
const buttonDiv = {
    margin:"20px auto 0 auto ",
    width:"360px"
};

const boxStyle = {
    margin: "0 auto 50px auto",
    // padding-left:'auto'
    // padding-right:'auto'
    border: '5px solid white',
    borderRadius:"5px",
    width: '500px',
    height: '300px',
    backgroundColor: 'white',
    backgroundRepeat:'',
    position:'center',
    opacity: '0.95'
};

const backgroundStyle = {
    // width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',

};

export default Landing;
