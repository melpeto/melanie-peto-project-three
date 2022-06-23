import { Link} from "react-router-dom";

const SeeAllPolls = () => {
    return (
        <div className="regButton seeAll">
            <Link to="/allpolls">See all active polls</Link>
        </div>
    )
}

export default SeeAllPolls;