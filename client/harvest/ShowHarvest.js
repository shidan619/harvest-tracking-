import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-harvest.js'
import {Redirect} from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    title: {
        margin: theme.spacing.unit * 2,
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    }
})

class ShowHarvest extends Component {
    constructor({match}) {
        super()
        this.state = {
            farmer_name:'',
            address:'',
            officer_name:'',
            contact_no:94,
            vegetable_type:'',
            vegetable_grade:'',
            plant_date:'',
            harvest_date:'',
            amount:'',
            open:false,
            error:''
        }
        this.match = match
    }

    componentDidMount = () => {
        const jwt = auth.isAuthenticated()
        read({
            harvestID: this.match.params.harvestID
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({
                    farmer_name:data.farmer_name,
                    address:data.address,
                    officer_name:data.officer_name,
                    contact_no:data.contact_no,
                    vegetable_type:data.vegetable_type,
                    vegetable_grade:data.vegetable_grade,
                    plant_date:data.plant_date,
                    harvest_date:data.harvest_date,
                    amount:data.amount,
                })
            }
        })
    }
    clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const harvest = {
            farmer_name:this.state.farmer_name || undefined,
            officer_name:jwt.user.name || undefined,
            address:this.state.address || undefined,
            contact_no:this.state.contact_no||undefined,
            vegetable_type:this.state.vegetable_type||undefined,
            vegetable_grade:this.state.vegetable_grade || undefined,
            plant_date: this.state.plant_date || undefined,
            harvest_date: this.state.harvest_date || undefined,
            amount:this.state.amount||undefined
        }
        update({
            harvestID: this.match.params.harvestID
        }, {
            t: jwt.token
        }, harvest).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({'harvestID': data._id, 'redirectToProfile': true})
            }
        })
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }
    render() {
        const {classes} = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/harvests/'}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Edit Harvest Details
                    </Typography>
                    <TextField id="farmer_name" label="farmer_name" className={classes.textField} value={this.state.farmer_name} onChange={this.handleChange('farmer_name')} margin="normal"/><br/>
                    <TextField id="address" label="address" className={classes.textField} value={this.state.address} onChange={this.handleChange('address')} margin="normal"/><br/>
                    <TextField id="contact_no" type="text" label="contact_no" className={classes.textField} value={this.state.contact_no} onChange={this.handleChange('contact_no')} margin="normal"/>
                    <TextField id="vegetable_type" label="vegetable_types" className={classes.textField} value={this.state.vegetable_type} onChange={this.handleChange('vegetable_type')} margin="normal"/><br/>
                    <TextField id="harvest_date" type="date" label="harvest_date" className={classes.textField} value={this.state.harvest_date.substring(0,10)} onChange={this.handleChange('harvest_date')} margin="normal"/><br/>
                    <TextField id="plant_date" type="date" label="plant_date" className={classes.textField} value={this.state.plant_date.substring(0,10)} onChange={this.handleChange('plant_date')} margin="normal"/><br/>
                    <br/> {
                    this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}
                    </Typography>)
                }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        )
    }
}

ShowHarvest.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ShowHarvest)