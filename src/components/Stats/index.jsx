import Chart from "../Chart";
import Leaderboard from "../Leaderboard";
import "./index.scss";

export default function Stats() {
  return (
    <div className="stats">
      <div className="section">
        <div className="heading">Analytics</div>
        <Chart />
      </div>
      <div className="section">
        <div className="heading">Leaderboard</div>
        <Leaderboard />
      </div>
    </div>
  );
}
