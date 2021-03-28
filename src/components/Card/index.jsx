import { StorageImage } from "reactfire";
import "./index.scss";

export default function Card({ title, onClick, path }) {
  return (
    <div className={"card"} onClick={onClick}>
      <StorageImage storagePath={path} alt={title} className={"bg"} />
      <div className={"card_content"}>
        <div className={"card_title"}>{title}</div>
        <div className={"card_button"}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 13.64V34.36C16 35.94 17.74 36.9 19.08 36.04L35.36 25.68C36.6 24.9 36.6 23.1 35.36 22.3L19.08 11.96C17.74 11.1 16 12.06 16 13.64Z"
              fill="#6B38FB"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
