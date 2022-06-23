import { useEffect, useState } from "react";
import firebase from './firebase.js';
import { getDatabase, ref, onValue, set} from 'firebase/database';
import { Link, useParams } from "react-router-dom";
import Result from "./Result.js";
import Header from "./Header.js";
import MakeAPollButton from "./MakeAPollButton.js";
// import SeeAllPolls from "./SeeAllPolls.js";

const DisplayNewPoll = () => {

    const { pollNumber } = useParams();

    const [countValueA, setCountValueA] = useState(0);
    const [countValueB, setCountValueB] = useState(0);
    const [poll, setPoll] = useState([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${pollNumber}`);
    const countARef = ref(database, `/${pollNumber}/countA`);
    const countBRef = ref(database, `/${pollNumber}/countB`);

    useEffect(() => {
        onValue(dbRef, (response) => {
            const data = response.val();
            setPoll(data);
        });
        onValue(countARef, (response) => {
            setCountValueA(response.val())
        });
        onValue(countBRef, (response) => {
            setCountValueB(response.val())
        });
    }, [])

    const handleVoteA = () => {
        const newCountValueA = (countValueA + 1);
        setCountValueA(newCountValueA);
        set(countARef, newCountValueA);
    }

    const handleVoteB = () => {
        const newCountValueB = (countValueB + 1);
        setCountValueB(newCountValueB);
        set(countBRef, newCountValueB);
    }

    return (
        <>
        <Header />

        <MakeAPollButton />

        <div className="resultsCard tightWrapper">

            <h2 className="userQ">{poll.userQuestion}</h2>

            <section className="results">

                <div className="resultA">
                    <button className="votingBtn" onClick={handleVoteA}>{poll.responseA}</button>
                    <Result count={countValueA}/>
                </div>

                <div className="resultB">
                    <button className="votingBtn" onClick={handleVoteB}>{poll.responseB}</button>
                    <Result count={countValueB}/>
                </div>

            </section>

        </div>

        {/* <MakeAPollButton />

        <SeeAllPolls /> */}

        {/* <div className="regButton">
            <Link to="/">Make a new poll</Link>
        </div> */}

        {/* <div className="regButton">
            <Link to="/allpolls">See all active polls</Link>
        </div> */}
        </>
    )
}

export default DisplayNewPoll;