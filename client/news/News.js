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
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Grid from "material-ui/Grid";
import {list} from "./api-news";
import auth from "../auth/auth-helper";
import NewsCard from "./NewsCard";
import {Button, Paper} from "material-ui";
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
        news:[]
    };
    componentDidMount() {
        const jwt = auth.isAuthenticated();
        list({t:jwt.token}).then((data)=>{
            if(data.error){
                console.log();
            }else{
                this.setState({news:data.reverse()});
            }

        }
        )
    }



    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                   News
                </Typography>
                {auth.isAuthenticated() && auth.isAuthenticated().user.role == "Admin" && (<span>

                         <Link variant="contained" color="primary" component="button" to="/news/add">
                           Add news
                         </Link>

                </span>)}
                <Grid container spacing={10} direction="column" alignItems="center" justify="center"
                      style={{minHeight:'100vh'}}>
                    {this.state.news.map((it,i)=>{
                        return <NewsCard item={it} />
                    })}

                </Grid>

            </Paper>

        )

    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);