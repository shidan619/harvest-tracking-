import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardContent from 'material-ui/Card/CardContent';
import CardActions from 'material-ui/Card/CardActions';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import auth from "../auth/auth-helper";
import MoreVertIcon from 'material-ui-icons/MoreVert';
import newsImg from './../assets/images/news.jpg'
import {Link} from "react-router-dom";

const styles = theme => ({
    root: theme.mixins.gutters({

        padding: theme.spacing.unit,
        margin: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle
    },
    header:{
        textAlign:'center',
        justifyContent:'center',
        justify:'center'
    },
    card: {

        maxWidth: 1200,
        minWidth:800,
        padding:'auto'
    },
    cardMedia:{
        maxWidth:800,
        minWidth: 600
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class News extends React.Component {
    state = {
        expanded:false,
        item:{}
    }
    componentDidMount() {
        this.setState({item:this.props.item})
    }
    handleExpandClick = () => {
        this.setState({expanded:!(this.state.expanded)});

    }


    render() {

        const { classes } = this.props;

        return (
                <Card className={classes.card}>
                    {(auth.isAuthenticated() && auth.isAuthenticated().user.role == "Admin")? (<CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                A
                            </Avatar>
                        }
                        action={
                            (<span>
                                    <Link to={"/news/"+this.state.item._id}>
                                    <IconButton >
                                        <MoreVertIcon  />
                                    </IconButton>
                                </Link>
                                </span>)

                        }
                        title="Admin"
                        subheader={this.state.item.created && this.state.item.created.substring(0,10)}
                    />): <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                A
                            </Avatar>
                        }

                        title="Admin"
                        subheader={this.state.item.created && this.state.item.created.substring(0,10)}
                    />}

                        <CardMedia className={classes.cardMedia}
                            className={classes.media}
                            image={newsImg}
                            title={this.state.item.news_heading}
                        />
                        <CardContent>
                            <Typography component="h1" >
                                {this.state.item.news_heading}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography>
                                    {this.state.item.content}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
        )

    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);