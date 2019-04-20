import React, { Component } from 'react'
import { Grid, Typography, FormControl, InputLabel, Input, Button, TextField, AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../actions/user'
import { withStyles } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import rings from '../../images/olympicrings.png'

const styles = theme => ({
  wrapper: {
    display: "flex",
    position: "relative",
    padding: "8.85px 13px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    widht: "100%"
  },
  textField: {
    boxSizing: "border-box",
    fontWeight: "300",
    textOverflow: "ellipsis",
    transition: ".4s all",
    width: "100%"
  },
  title: {
    alignItems: "center"
  },
})

const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", 'IA', "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", 
"MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const COUNTRIES = ["Abkhazia","Afghanistan","Albania","Algeria","American Samoa (U.S.)","Andorra","Angola","Anguilla (UK)","Antigua and Barbuda","Argentina","Armenia",
"Aruba (Netherlands)","Australia","Austria","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda (UK)","Bhutan","Bolivia",
"Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands (UK)","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
"Cayman Islands (UK)","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands (Australia)","Colombia","Comoros","Congo",
"Cook Islands (NZ)","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt",
"El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands (UK)","Faroe Islands (Denmark)","Fiji","Finland","France","French Polynesia","Gabon",
"Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam (U.S.)","Guatemala","Guernsey","Guinea","Guinea - Bissau","Guyana","Haiti","Honduras","Hong Kong",
"Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man (UK)","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati",
"North Korea","South Korea","Kosovo","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia",
"Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Nagorno - Karabakh","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand",
"Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Turkish Republic of Northern Cyprus","Northern Mariana","Norway","Oman","Pakistan","Palau","Palestine","Panama",
"Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Saint Barthelemy","Saint Helena",
"Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
"Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","Somaliland","South Africa","South Ossetia","Spain","Sri Lanka","Sudan",
"Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor - Leste","Togo","Tokelau","Tonga","Transnistria Pridnestrovie",
"Trinidad and Tobago","Tristan da Cunha","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
"United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","British Virgin Islands","Isle of Man","US Virgin Islands","Wallis and Futuna",
"Western Sahara","Yemen","Zambia","Zimbabwe"]

class Register extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    city: "",
    zip: "",
    state: "",
    phoneNumber: "",
    countryOfOrigin: ""
  }




  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, street, city, zip, state, phoneNumber, countryOfOrigin } = this.state
    fetch('http://localhost:3001/api/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        street,
        city,
        zip,
        state,
        phoneNumber,
        countryOfOrigin
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.userLoggedIn(data.user)
        localStorage.setItem('cool-jwt', data.token)
        this.props.history.push('/dashboard')
      })
  }


  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar className={classes.title} position="static" color="primary">
          <Toolbar>
            <Typography style={{ color: "white", font: "2em/1em Trade-Gothic-W-Cond-Bold,Arial,Helvetica,sans-serif" }}>
              Rio Olympics 2016 Registration
            </Typography>
          </Toolbar>
        </AppBar>
        <form
          className={classes.form}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <Grid container direction="column" justify="center" alignItems="stretch" style={{ minHeight: '50vh' }}>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <span className={classes.wrapper} align="center" style={{ marginLeft: 150 }}>
                <img src={rings} alt="Olympic Rings" width="70%" height="70%" object-fit="contain" />
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> First Name </InputLabel>
                  <Input
                    id="first_name"
                    name="firstName"
                    type="text"
                    autoComplete="first name"
                    onChange={this.onChange}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Last Name </InputLabel>
                  <Input
                    id="last_name"
                    name="lastName"
                    type="string"
                    autoComplete="last name"
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Email </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required>
                  <InputLabel> Password </InputLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    onChange={this.onChange}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> Home Address </InputLabel>
                  <Input
                    id="street"
                    name="street"
                    type="text"
                    autoComplete="street"
                    autoFocus
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <InputLabel> City </InputLabel>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    autoFocus
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Zip </InputLabel>
                  <Input
                    id="zip"
                    name="zip"
                    type="text"
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className={classes.wrapper}>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <TextField
                    label="State"
                    id="state"
                    select
                    name="state"
                    type="text"
                    autoComplete="state"
                    autoFocus
                    value={this.state.state}
                    onChange={this.onChange}
                    className={classes.group}
                  >
                    {STATES.map((states, key) => (
                      <MenuItem key={key} value={states}>
                        {states}
                      </MenuItem>

                    ))
                    }
                  </TextField>
                </FormControl>
                <FormControl fullWidth required style={{ marginRight: 20 }}>
                  <TextField
                    label="Country of Origin"
                    id="countryoforigin"
                    select
                    name="countryoforigin"
                    type="text"
                    autoComplete="countryoforigin"
                    autoFocus
                    value={this.state.countryOfOrigin}
                    onChange={this.onChange}
                    className={classes.group}
                  >
                    {COUNTRIES.map((countryOfOrigin, key) => (
                      <MenuItem key={key} value={countryOfOrigin}>
                        {countryOfOrigin}
                      </MenuItem>

                    ))
                    }
                  </TextField>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel> Phone Number </InputLabel>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={this.onChange}
                    className={classes.group}
                  />
                </FormControl>
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span className={classes.wrapper}>
                <Button type="submit" className={classes.textField} style={{ height: "50px" }}>
                  Submit
                </Button>
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userLoggedIn: (user) => dispatch(userLoggedIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))