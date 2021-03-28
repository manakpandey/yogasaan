import { Suspense, useEffect } from "react";
import { useHistory } from "react-router";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "../Card";
import "./index.scss";

export default function Home() {
  const poseRef = useFirestore().collection("poses");
  const userRef = useFirestore().collection("users");
  const { data: user } = useUser();

  useEffect(() => {
    userRef.doc(user.uid).set({
      name: user.displayName,
    });
  }, []);

  const Swal = withReactContent(swal);
  if (!localStorage.getItem("main"))
    Swal.fire({
      title: (
        <img
          src="/logo_small.png"
          alt="Yogasaan"
          style={{ width: 64, height: 64 }}
        />
      ),
      html: (
        <p style={{ fontFamily: "Rubik, sans-serif", fontWeight: 300 }}>
          Hey, {user.displayName}, <br />
          <br />
          Welcome to <b>Yogasaan</b>, Yoga made Asaan (easy :)) Practicing yoga
          from home was never easier!
        </p>
      ),
      didOpen: () => {
        localStorage.setItem("main", true);
      },
      confirmButtonText: "Continue",
      confirmButtonColor: "#6b38fb",
    });

  const history = useHistory();
  const poses = useFirestoreCollectionData(poseRef);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className={"home"}>
        <div className={"home_heading"}>Standalone Poses</div>
        <div className={"card_container"}>
          {poses.data?.map((pose) => (
            <Card
              key={pose.NO_ID_FIELD}
              title={pose.name}
              onClick={() => history.push(`pose?pid=${pose.NO_ID_FIELD}`)}
              path={pose.image_url}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
