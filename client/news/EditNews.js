import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-news.js'
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

class EditNews extends Component {
    constructor({match}) {
        super()
        this.state = {
            news_heading:'',
            content:'',
            open:false,
            error:''
        }
        this.match = match
    }

    componentDidMount = () => {
        const jwt = auth.isAuthenticated()
        read({
            newsID: this.match.params.newsID
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({
                    news_heading: data.news_heading|| undefined,
                    content:data.content || undefined
                })
            }
        })
    }
    clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const news = {
           news_heading: this.state.news_heading || undefined,
           content : this.state.content|| undefined
        }
        update({
            newsID: this.match.params.newsID
        }, {
            t: jwt.token
        }, news).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({'newsID': data._id, 'redirectToProfile': true})
            }
        })
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }
    render() {
        const {classes} = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/news/'}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Edit News  Details
                    </Typography>
                    <TextField id="news_heading" label="News Heading" className={classes.textField} value={this.state.news_heading} onChange={this.handleChange('news_heading')} margin="normal"/><br/>
                    <TextField id="content" label="Content" className={classes.textField} value={this.state.content} onChange={this.handleChange('content')} margin="normal" multiline rows={4} rowsMax={4}/><br/>
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

EditNews.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditNews)