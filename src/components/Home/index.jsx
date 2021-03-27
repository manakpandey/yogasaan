import { useAuth } from "reactfire";
import "firebase/auth";

export default function Home() {
  const auth = useAuth();
  const signOut = async () => {
    try {
      auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
