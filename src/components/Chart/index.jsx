import { Bar } from "@reactchartjs/react-chart.js";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import _ from "lodash";

export default function Chart() {
  const histRef = useFirestore()
    .collection("history")
    .where("uid", "==", useUser().data.uid);
  const docs = useFirestoreCollectionData(histRef);

  const poseRef = useFirestore().collection("poses");
  const pdocs = useFirestoreCollectionData(poseRef);

  const [data, setData] = useState({});

  useEffect(() => {
    const _docs = [];
    const _poses = {};
    docs.data?.forEach((doc) => {
      _docs.push({ uid: doc.uid, score: doc.score });
    });
    pdocs.data?.forEach((doc) => {
      _poses[doc.NO_ID_FIELD] = doc.name;
    });
    console.log(_poses);

    const gdocs = _.groupBy(_docs, (doc) => doc.id);
    console.log(gdocs);
    const res = _.map(gdocs, (id, i) => ({
      id: i,
      score: _.sumBy(id, "score"),
    }));
    const mapped = [];
    res.forEach((d) => {
      mapped.push({
        name: _poses[d.id],
        score: d.score,
      });
    });
    console.log(mapped);
    const labels = _.map(res, "name");
    const _data = _.map(res, "score");

    const resData = {
      labels: labels,
      datasets: [
        {
          label: "Score",
          data: _data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setData(resData);
  }, [docs.data, pdocs.data]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
