import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import _ from "lodash";
import "./index.scss";

export default function Leaderboard() {
  const histRef = useFirestore().collection("history");
  const docs = useFirestoreCollectionData(histRef);

  const userRef = useFirestore().collection("users");
  const users = useFirestoreCollectionData(userRef);

  const [board, setBoard] = useState([]);
  useEffect(() => {
    const _docs = [];
    const _users = {};
    docs.data?.forEach((doc) => {
      _docs.push({ uid: doc.uid, score: doc.score });
    });
    users.data?.forEach((doc) => {
      _users[doc.NO_ID_FIELD] = doc.name;
    });

    const gdocs = _.groupBy(_docs, (doc) => doc.uid);
    const res = _.map(gdocs, (uid, id) => ({
      uid: id,
      score: _.sumBy(uid, "score"),
    }));

    const mapped = [];
    res.forEach((d) => {
      mapped.push({
        name: _users[d.uid] ? _users[d.uid] : d.uid,
        score: d.score,
      });
    });
    setBoard(_.sortBy(mapped, "score").reverse());
  }, [docs.data, users.data]);

  return (
    <div className="leaderboard">
      {board.map((row, i) => (
        <div className={"row"}>
          <div className={"rank"}>
            <span>{i + 1}.</span>
            <span>{row.name}</span>
          </div>
          <div>{row.score}</div>
        </div>
      ))}
    </div>
  );
}
