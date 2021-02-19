import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'

import {Link} from 'react-router-dom'
import {list} from './api-harvest.js'
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

class Users extends Component {
    state = {
        harvests: []
    }

    componentDidMount() {
        const jwt = auth.isAuthenticated();
        list({t:jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({harvests: data})
            }
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Harvests
                </Typography>
                {/*<List dense>*/}
                {/*    {this.state.harvests.map((item, i) => {*/}
                {/*        return <Link to={"/harvests/" + item._id} key={i}>*/}
                {/*            <ListItem button>*/}
                {/*                <ListItemText primary={item.farmer_name}/>*/}
                {/*                <ListItemSecondaryAction>*/}
                {/*                    <IconButton>*/}
                {/*                        <ArrowForward/>*/}
                {/*                    </IconButton>*/}
                {/*                </ListItemSecondaryAction>*/}
                {/*            </ListItem>*/}
                {/*        </Link>*/}
                {/*    })*/}
                {/*    }*/}
                {/*</List>*/}
                <Table id="myTable" className="display">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Farmer name</TableCell>
                            <TableCell>Officer name</TableCell>
                            <TableCell>Vegetable type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Harvest date</TableCell>
                            <TableCell>Plant date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.harvests.map((item, i) => {
                            return(
                                <TableRow>
                                    <Link to={"/harvests/" + item._id} key={i}>
                                    <TableCell>{i}</TableCell>
                                    </Link>
                                    <TableCell>{item.farmer_name}</TableCell>
                                    <TableCell>{item.officer_name}</TableCell>
                                    <TableCell>{item.vegetable_type}</TableCell>
                                    <TableCell>{item.amount} Kg</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.plant_date.substring(0,10)}</TableCell>
                                    <TableCell>{item.harvest_date.substring(0,10)}</TableCell>
                                </TableRow>)

                        })
                        }
                    </TableBody>
                </Table>
                <Link to="/harvests/add">
                    <Button variant="contained" color="primary">
                        Add Harvest
                    </Button>
                </Link>

            </Paper>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)