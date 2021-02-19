import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-demand.js'
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

class EditDemand extends Component {
    constructor({match}) {
        super()
        this.state = {
            demand_year:"",
            demand_amount:"",
            vegetable_type:""
        }
        this.match = match
    }

    componentDidMount = () => {
        const jwt = auth.isAuthenticated()
        read({
            demandID: this.match.params.demandID
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({
                    demand_year:data.demand_year,
                    demand_amount:data.demand_amount,
                    vegetable_type:data.vegetable_type
                })
            }
        })
    }
    clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const demand = {
            demand_year:this.state.demand_year||undefined,
            demand_amount:this.state.demand_amount||undefined,
            vegetable_type:this.state.vegetable_type||undefined
        }
     //   console.log(this.match.params);
        update({
            demandID: this.match.params.demandID
        }, {
            t: jwt.token
        }, demand).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({'demandID': data._id, 'redirectToProfile': true})
            }
        })
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }
    render() {
        const {classes} = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/demands/'}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Edit Demand Details
                    </Typography>
                    <TextField id="vegetable_type" label="Vegetable Type" className={classes.textField} value={this.state.vegetable_type} onChange={this.handleChange('vegetable_type')} margin="normal"/><br/>
                    <TextField id="demand_amount" label="Demand amount" className={classes.textField} value={this.state.demand_amount} onChange={this.handleChange('demand_amount')} margin="normal"/><br/>
                    <TextField id="demand_year" type="text" label="Demand Year" className={classes.textField} value={this.state.demand_year} onChange={this.handleChange('demand_year')} margin="normal"/>
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

EditDemand.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditDemand)