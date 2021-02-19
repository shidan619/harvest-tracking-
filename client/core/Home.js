import React,{Component} from "react";
import PropTypes from 'prop-types'; //Todo check this
import {withStyles} from   "material-ui/styles"
import Card,{CardContent,CardMedia} from "material-ui/Card";
import Typography from "material-ui/Typography"
import seaShellImg from './../assets/images/seashell.jpg'
import vegetableImg from './../assets/images/vegetable.jpg'
import Link from "react-router-dom/Link";

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
    },
    title: {
        padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
    ${theme.spacing.unit * 2}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component{
    render() {
        const {classes} = this.props;
        return(
            <div>
                <Card className={classes.card}>
                    <Typography type="headline" component="h1" className={classes.title}>
                       Harvest Tracking
                    </Typography>
                    <CardMedia className={classes.media} image={vegetableImg} title="Unicorn Shells"/>
                    <CardContent>
                        <Typography type="body" component="p">
                            Welcome to the Harvest app
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }

}

Home.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)