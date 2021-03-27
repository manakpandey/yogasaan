import { useAuth } from "reactfire";
import firebase from "firebase";
import "firebase/auth";
import "./index.scss";
import google from "../../assets/google.svg";

export default function Login() {
  const auth = useAuth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const signIn = async () => {
    try {
      const pop = await auth.signInWithPopup(provider);
      const cred = pop.credential;
      const user = pop.user;

      console.log(cred.toJSON(), user.toJSON());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={"login_container"}>
      <div className={"login_form"}>
        <div>LOGO</div>
        <div
          tabIndex={0}
          className={"signin_with_google"}
          onClick={() => signIn()}
        >
          <img src={google} alt="" className={"icon"} />
          Continue with Google
        </div>
      </div>
    </div>
  );
}
