import { AuthCheck, FirebaseAppProvider } from "reactfire";
import "./App.scss";
import "firebase/auth";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Pose from "./components/Pose";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAWliD4fBjUd92UWPHHoEWNHQlvsQDki0c",
    authDomain: "yogasaan-8b957.firebaseapp.com",
    projectId: "yogasaan-8b957",
    storageBucket: "yogasaan-8b957.appspot.com",
    messagingSenderId: "722581265268",
    appId: "1:722581265268:web:68948309eaad4f279fea21",
  };

  return (
    <div className={"main"}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthCheck fallback={<Login />}>
          <Router>
            <Header />
            <Switch>
              <Route path="/pose">
                <Pose poseID={"4XIRMFpmKmUiFNjWgUrr"}/>
              </Route>

              <Route path="/stats">stats</Route>
              <Route path="/profile">Profile</Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </AuthCheck>
      </FirebaseAppProvider>
    </div>
  );
}

export default App;
