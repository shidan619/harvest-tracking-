import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'

import {Link} from 'react-router-dom'
import {list} from './api-demand.js'
import Button from "material-ui/Button";
import auth from "../auth/auth-helper";
import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing.unit,
        margin: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle
    }
})

class Demands extends Component {
    state = {
        demands: []
    }

    componentDidMount() {
        const jwt = auth.isAuthenticated();
        list({t:jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({demands: data})
            }
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Demands
                </Typography>
                <Table id="myTable" className="display">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Vegetable Name</TableCell>
                            <TableCell>Demand Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.demands.map((item, i) => {
                            return(
                                <TableRow>
                                    <Link to={"/demands/" + item._id} key={i}>
                                        <TableCell>{i}</TableCell>
                                    </Link>
                                    <TableCell>{item.vegetable_type}</TableCell>
                                    <TableCell>{item.demand_amount} Kg</TableCell>
                                </TableRow>)

                        })
                        }
                    </TableBody>
                </Table>
                {auth.isAuthenticated() && auth.isAuthenticated().user.role == "Admin" &&(
                <Link to="/demands/add">
                    <Button variant="contained" color="primary">
                        Add Demand
                    </Button>
                </Link>
)}
            </Paper>
        )
    }
}

Demands.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Demands)