import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-harvest.js'
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

class AddHarvest extends Component{
    state = {
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

    handleChange = name => event => {
        this.setState({[name]:event.target.value})
    }

    clickSubmit = ()=>{
        const jwt = auth.isAuthenticated()
        console.log(jwt.user.name)
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
        create(harvest,{t:jwt.token}).then((data)=>{
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
                            Add Harvest
                        </Typography>
                        <TextField id="farmer_name" label="farmer_name"
                                   className={classes.textField}
                                   value={this.state.farmer_name}
                                   onChange={this.handleChange('farmer_name')}
                                   margin="normal"/> <br/>
                        <TextField id="address" type="text" label="address"
                                   className={classes.textField} value=
                                       {this.state.address}
                                   onChange={this.handleChange('address')}
                                   margin="normal"/><br/>
                        <TextField id="contact_no" type="tel"
                                   label="contact_no" className={classes.textField}
                                   value={this.state.contact_no}
                                   onChange={this.handleChange('contact_no')}
                                   margin="normal"/><br/>
                        <TextField id="vegetable_type" type="text"
                                   label="vegetable_type" className={classes.textField}
                                   value={this.state.vegetable_type}
                                   onChange={this.handleChange('vegetable_type')}
                                   margin="normal"/><br/>
                        <TextField id="vegetable_grade" type="text"
                                   label="vegetable_grade" className={classes.textField}
                                   value={this.state.vegetable_grade}
                                   onChange={this.handleChange('vegetable_grade')}
                                   margin="normal"/><br/>
                        <TextField id="amount" type="text"
                                   label="amount" className={classes.textField}
                                   value={this.state.amount}
                                   onChange={this.handleChange('amount')}
                                   margin="normal"/><br/>
                        <TextField id="harvest_date" type="date"
                                   label="Harvest Date" className={classes.textField}
                                   value={this.state.harvest_date}
                                   onChange={this.handleChange('harvest_date')}
                                   margin="normal"/><br/>
                        <TextField id="plant_date" type="date"
                                   label="Plant Date" className={classes.textField}
                                   value={this.state.plant_date}
                                   onChange={this.handleChange('plant_date')}
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
                    <DialogTitle>New Harvest</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            New harvest successfully added.
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
AddHarvest.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddHarvest)