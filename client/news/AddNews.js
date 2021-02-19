import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-news.js'
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
        news_heading:'',
        content:'',
        created:'',
        updated:'',
        open:false,
        error:''
    }

    handleChange = name => event => {
        this.setState({[name]:event.target.value})
    }


    clickSubmit = ()=>{
        const jwt = auth.isAuthenticated()
        console.log(jwt.user.name)
        const news = {
            news_heading:this.state.news_heading||undefined,
            content:this.state.content||undefined,
            created:this.state.created||undefined,
            updated:this.state.updated || undefined,
        }
        create(news,{t:jwt.token}).then((data)=>{
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
                            Add News
                        </Typography>
                        <TextField id="news_heading" label="News Heading"
                                   className={classes.textField}
                                   value={this.state.news_heading}
                                   onChange={this.handleChange('news_heading')}
                                   margin="normal"/> <br/>
                        <TextField id="content" type="text" label="Content" multiline
                                   rowsMax={4} rows={4}
                                   className={classes.textField} value=
                                       {this.state.content}
                                   onChange={this.handleChange('content')}
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
                    <DialogTitle>New News</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            New news added
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/news">
                            <Button color="primary" autoFocus="autoFocus" variant="raised"  >
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