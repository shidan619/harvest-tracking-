import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-demand.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'
import auth from "../auth/auth-helper";
import Paper from "material-ui/Paper";

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.openTitle
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

class AddDemand extends Component{
    state = {
        vegetable_type: "",
        demand_amount: "",
        demand_year:"",
    }

    handleChange = name => event => {
        this.setState({[name]:event.target.value})
    }

    clickSubmit = ()=>{
        const jwt = auth.isAuthenticated()
       // console.log(jwt.user.name)
        const demand = {
            vegetable_type:this.state.vegetable_type||undefined,
            demand_amount: this.state.demand_amount||undefined,
            demand_year:this.state.demand_year||undefined,
        }
        console.log(demand)
        create(demand,{t:jwt.token}).then((data)=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                this.setState({error:'',open:true})
            }
        })
    }
    render() {
        const {classes} = this.props
        return (<Paper>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2"
                                    className={classes.title}>
                            Add Demand
                        </Typography>
                        <TextField id="vegetable_name" label="Vegetable Name"
                                   className={classes.textField}
                                   value={this.state.vegetable_type}
                                   onChange={this.handleChange("vegetable_type")}
                                   margin="normal"/> <br/>
                        <TextField id="amount" type="number" label="Amount"
                                   className={classes.textField} value=
                                       {this.state.demand_amount}
                                   onChange={this.handleChange('demand_amount')}
                                   margin="normal"/><br/>
                        <TextField id="year" type="number" label="Year"
                                   className={classes.textField} value=
                                       {this.state.demand_year}
                                   onChange={this.handleChange('demand_year')}
                                   margin="normal"/><br/>
                        {this.state.error && ( <Typography component="p"
                                                           color="error">
                            <Icon color="error"
                                  className={classes.error}>error</Icon>
                            {this.state.error}</Typography>)}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" raised="raised"
                                onClick={this.clickSubmit}
                                className={classes.submit}>Submit</Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.open} >
                    <DialogTitle>New Demand</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            New Demand successfully added.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/">
                            <Button color="primary" autoFocus="autoFocus" variant="raised">
                                Go Back
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </Paper>
        )
    }
}
AddDemand.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddDemand)