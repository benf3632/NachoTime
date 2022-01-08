import classNames from "classnames";
import { MdOutlineClose } from "react-icons/md";

const CloseButton = ({ className, onClick }) => {
  return (
    <button
      className={classNames(className, {
        "video-react-control": true,
        "video-react-button": true,
      })}
      tabIndex="0"
      onClick={onClick}
    >
      <MdOutlineClose
        style={{ width: "20px", height: "20px", textAlign: "center" }}
      />
    </button>
  );
};

export default CloseButton;
