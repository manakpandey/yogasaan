import { Suspense } from "react";
import { useHistory } from "react-router";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Card from "../Card";
import "./index.scss";

export default function Home() {
  const poseRef = useFirestore().collection("poses");
  const history = useHistory();
  const poses = useFirestoreCollectionData(poseRef);

  return (
    <Suspense>
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
