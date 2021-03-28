import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  useUser,
} from "reactfire";
import "firebase/auth";
import { useEffect, useState } from "react";
import "./index.scss";

export default function Profile() {
  const auth = useAuth();
  const { data: user } = useUser();
  const [score, setScore] = useState(0);
  const histref = useFirestore()
    .collection("history")
    .where("uid", "==", user.uid);

  const docs = useFirestoreCollectionData(histref);

  useEffect(() => {
    let total = 0;
    docs.data?.forEach((doc) => {
      total += doc.score;
    });
    setScore(total);
  }, [docs.data]);

  const signOut = async () => {
    try {
      auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={"profile"}>
      <div className={"greeting"}>Hey, {user.displayName}</div>
      <div className={"score"}>
        <span style={{ color: "#000", fontSize: 32 }}>Your have earned </span>
        {score}
        <span style={{ color: "#000", fontSize: 32 }}> points. </span>
      </div>
      <div tabIndex={0} onClick={() => signOut()} className={"signout"}>
        Sign Out
      </div>
    </div>
  );
}
