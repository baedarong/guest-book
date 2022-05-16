import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Logout from "components/Logout";
const AppRouter = ({isLoggedIn, isAdmin, userObj, refreshUser}) =>  {

     return (
        <Router>
            {isLoggedIn && <Logout userObj={userObj} refreshUser={refreshUser} />}
            <Switch>
                {isLoggedIn ?
                <div
                style={{
                  maxWidth: 890,
                  width: "100%",
                  margin: "0 auto",
                  marginTop: 80,
                  display: "flex",
                  justifyContent: "center",
                }}
                >
                <Route exact path="/"><Home userObj={userObj} isAdmin={isAdmin} /></Route> 
                </div>
                :
                <Route exact path="/"><Auth/></Route>}
            </Switch>
        </Router>
    )
}

export default AppRouter;