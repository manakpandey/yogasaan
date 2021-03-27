import { useAuth } from "reactfire";
import firebase from "firebase";
import "firebase/auth";

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
    <div>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}
