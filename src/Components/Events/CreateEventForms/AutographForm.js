import React, { Component } from 'react'
import { withStyles, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MenuItem from '@material-ui/core/MenuItem';

const autographFormStyles = {
  wrapper: {
    display: "inline-block",
    position: "relative",
    padding: "8.85px 13px"
  },
  textField: {
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "300",
    textOverflow: "ellipsis"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  button: {
    position: "relative",
    width: "100%",
    borderRadius: "3px",
    boxSizing: "border-box",
    marginTop: "20px"
  }
}

const fixingTime = (time) => {
  let checktime = parseInt(time);
    if (checktime < 12 && time.includes("AM")) {
      return checktime+":00:00";
    } else if (checktime === 12) {
      return checktime = checktime.toString() + ":00:00";
    } else {
      checktime += 12;
      checktime = checktime.toString() + ":00:00";
      return checktime;
    }
}

const fixingDate = (date) => {
  let newMonth;
  let newDay;
  let newYear = date.getFullYear().toString();
  
  if(date.getMonth() < 10){
    newMonth = "0"+ date.getMonth().toString();
  } else {
    newMonth = date.getMonth().toString();
  }

  if(date.getDate() < 10){
    newDay = "0"+ date.getDate().toString();
  } else {
    newDay = date.getDate().toString();
  }
  return (newYear+"-"+newMonth+"-"+newDay);
}


const stadiums = ["Carioca Arena 1", "Carioca Arena 2", "Carioca Arena 3", "Olympic Aquatics Stadium", "Deodoro Olympic Whitewater Stadium"]
const timeSlots = [
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
          "7:30 PM",
          "8:00 PM",
          "8:30 PM",
          "9:00 PM",
          "9:30 PM",
          "10:00 PM"
]

class AutographForm extends Component {

  state = {
    allAthletes: [],
    selectedAthlete: {},
    time: "",
    date: new Date(),
    venue: ""
  }

  componentDidMount = () => {
    if(this.props.userType === 3) {
      fetch("http://localhost:3001/api/getAthletes")
        .then(response => response.json())
        .then(data => {
          this.setState({
            allAthletes: data.athletes
          })
        })
        .catch(err => console.log(err))
    }
  }

  onTimeChange = (date) => {
    this.setState({ date: date })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    const { selectedAthlete, time, venue, date } = this.state
    //Edit here time. 
    const newTime = fixingTime(time);
    const newDate = fixingDate(date);

    const athleteUserId = this.props.userType === 3 ? selectedAthlete.userid : this.props.userId

    fetch('http://localhost:3001/api/createAutographEvent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        athleteUserId,
        newTime,
        newDate,
        venue
      })
    })
      .then(response => response.json())
      .then(result => {
        this.props.handleClose()
      })
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {this.props.userType === 3 ? (
          <span className={classes.wrapper}>
            <TextField
              margin="normal"
              label="Who's signing"
              select
              required
              className={classes.textField}
              value={this.state.selectedAthlete}
              onChange={this.handleChange("selectedAthlete")}
            >
              {this.state.allAthletes.map((athlete, key) => (
                <MenuItem key={key} value={athlete}>
                  {athlete.fname + " " + athlete.lname}
                </MenuItem>
              ))}
            </TextField>
          </span>
        ) : null}
        <span className={classes.wrapper}>
          <TextField
            margin="normal"
            label="What time?"
            select
            required
            className={classes.textField}
            value={this.state.time}
            onChange={this.handleChange("time")}
          >
            {timeSlots.map((time, key) => (
              <MenuItem key={key} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.wrapper}>
          <DatePicker
            margin="normal"
            label="What date?"
            value={this.state.date}
            className={classes.textField}
            onChange={this.onTimeChange}
          />
        </span>
        <span className={classes.wrapper}>
          <TextField 
            id="venue"
            label="Venue"
            required
            className={classes.textField}
            select
            value={this.state.venue}
            onChange={this.handleChange("venue")}
            margin="normal"
          >
            {stadiums.map((stadium, key) => (
              <MenuItem key={key} value={stadium}>
                {stadium}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className={classes.wrapper}>
          <Button onClick={this.submit} className={classes.button}>
            Submit
          </Button>
        </span>
      </MuiPickersUtilsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userid,
    userType: state.user.usertype
  }
}

export default connect(mapStateToProps, null)(withStyles(autographFormStyles)(AutographForm))