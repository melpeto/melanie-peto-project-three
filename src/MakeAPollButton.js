import { Link } from "react-router-dom";

const MakeAPollButton = () => {
    return (
        <div className="regButton makePoll">
            <Link to="/">Make a new poll</Link>
        </div>
    )
}

export default MakeAPollButton;