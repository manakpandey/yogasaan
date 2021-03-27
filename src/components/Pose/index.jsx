import { Suspense } from "react";
import Posenet from "react-posenet";
import { StorageImage, useFirestore, useFirestoreDocData } from "reactfire";
import "./index.scss";

export default function Pose({ poseID }) {
  const poseRef = useFirestore().collection("poses").doc(poseID);
  const pose = useFirestoreDocData(poseRef);

  return (
    <Suspense fallback={"Loading"}>
      <div className={"pose"}>
        <div className={"pose_sample"}>
          <StorageImage
            storagePath={pose.data?.image_url}
            className={"pose_sample"}
            alt={"Sample Pose"}
          />
        </div>

        <div className={"pose_actual"}>
          <Posenet />
        </div>
      </div>
    </Suspense>
  );
}
