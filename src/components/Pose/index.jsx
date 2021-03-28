import { Suspense, useState } from "react";
import Posenet from "react-posenet";
import { StorageImage, useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./index.scss";
import { useLocation } from "react-router";
import { checkJoints } from "../../utils/getAngles";
import { getScore } from "../../utils/getScore";
import Result from "../Result";

export default function Pose() {
  const query = new URLSearchParams(useLocation().search);
  const poseID = query.get("pid");
  const poseRef = useFirestore().collection("poses").doc(poseID);
  const pose = useFirestoreDocDataOnce(poseRef);

  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [frames, setFrames] = useState(0);

  const handlePose = (p) => {
    if (p && start) {
      const ang = checkJoints(p[0]);
      const _score = getScore(pose.data?.angles, ang);
      setScore(score + _score);
      setFrames(frames + 1);
    }
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      {!finish ? (
        <div className={"pose"}>
          <div className={"pose_sample"}>
            <div className={"pose_title"}>{pose.data?.name}</div>
            <StorageImage
              storagePath={pose.data?.image_url}
              className={"pose_sample"}
              alt={"Sample Pose"}
            />
            <div className={"timer_button"}>
              <div className={"timer"}>
                <CountdownCircleTimer
                  onComplete={() => setFinish(true)}
                  isPlaying={start}
                  duration={15}
                  colors={[
                    ["#afa5ff", 0.33],
                    ["#F7B801", 0.33],
                    ["#A30000", 0.33],
                  ]}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>

              <div
                className={`start_button ${start ? "disabled" : ""}`}
                tabIndex={start ? -1 : 0}
                onClick={() => setStart(true)}
              >
                Start
              </div>
            </div>
          </div>

          <div className={"pose_actual"}>
            <Posenet onEstimate={handlePose} />
          </div>
        </div>
      ) : (
        <Result
          score={Math.floor(score / frames) * pose.data?.level}
          isPose={true}
          id={pose.data?.NO_ID_FIELD}
          duration={15}
        />
      )}
    </Suspense>
  );
}
