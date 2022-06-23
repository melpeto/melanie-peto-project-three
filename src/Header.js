import SeeAllPolls from "./SeeAllPolls";

const Header = () => {
    return (
        <header className='wrapper'>

            <SeeAllPolls />

            <h1>Poll App</h1>
            <p className="pun">Where do reindeer vote? <span>The North Poll!</span></p>

        </header>
    )
}

export default Header;