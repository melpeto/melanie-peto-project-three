import SeeAllPolls from "./SeeAllPolls";

const Header = () => {
    return (
        <header className='wrapper'>

            {/* <MakeAPollButton /> */}

            <SeeAllPolls />

            <h1>Poll App</h1>
            <p className="pun">Where do reindeer vote? <span>The North Poll!</span></p>

            {/* <div className="regButton">
                <Link to="/allpolls">See all active polls</Link>
            </div> */}

        </header>
    )
}

export default Header;