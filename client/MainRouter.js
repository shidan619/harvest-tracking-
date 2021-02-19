import React,{Component} from "react";
import {Route,Switch} from "react-router-dom"
import Home from "./core/Home"
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu"
import AddHarvest from "./harvest/AddHarvest";
import Harvests from "./harvest/Harvests";
import ShowHarvest from "./harvest/ShowHarvest";
import News from "./news/News";
import AddNews from "./news/AddNews";
import EditNews from "./news/EditNews";
import Demands from "./demand/Demands";
import AddDemand from "./demand/AddDemand";
import EditDemand from "./demand/EditDemand";
class MainRouter extends Component{
    render() {
        return(<div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute path="/news/add" component={AddNews}/>
                <PrivateRoute path="/news/:newsID" component={EditNews} />
                <Route path="/news" component={News}/>
                <Route path="/users" component={Users}/>
                <Route path="/register" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <PrivateRoute path="/harvests/add" component={AddHarvest}/>
                <PrivateRoute path="/harvests/:harvestID" component={ShowHarvest}/>
                <PrivateRoute path="/harvests" component={Harvests}/>
                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <PrivateRoute path="/demands/add" component={AddDemand}/>
                <PrivateRoute path="/demands/:demandID" component={EditDemand}/>
                <PrivateRoute path = "/demands/" component={Demands}/>

                <Route path="/user/:userId" component={Profile}/>

            </Switch>
        </div>)
    }

}
export default MainRouter