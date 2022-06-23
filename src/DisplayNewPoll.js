import { useEffect, useState } from "react";
import firebase from './firebase.js';
import { getDatabase, ref, onValue, set} from 'firebase/database';
import { useParams } from "react-router-dom";
import Result from "./Result.js";
import Header from "./Header.js";
import MakeAPollButton from "./MakeAPollButton.js";

const DisplayNewPoll = () => {

    const [countValueA, setCountValueA] = useState(0);
    const [countValueB, setCountValueB] = useState(0);
    const [poll, setPoll] = useState([]);

    const { pollNumber } = useParams();

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${pollNumber}`);
        onValue(dbRef, (response) => {
            const data = response.val();
            setPoll(data);
        });
        const countARef = ref(database, `/${pollNumber}/countA`);
        onValue(countARef, (response) => {
            setCountValueA(response.val())
        });
        const countBRef = ref(database, `/${pollNumber}/countB`);
        onValue(countBRef, (response) => {
            setCountValueB(response.val())
        });
    }, [pollNumber])
    // had to include dependency of pollNumber in order to make netlify deployment work

    const handleVoteA = () => {
        const newCountValueA = (countValueA + 1);
        const database = getDatabase(firebase);
        const countARef = ref(database, `/${pollNumber}/countA`);
        setCountValueA(newCountValueA);
        set(countARef, newCountValueA);
    }

    const handleVoteB = () => {
        const newCountValueB = (countValueB + 1);
        const database = getDatabase(firebase);
        const countBRef = ref(database, `/${pollNumber}/countB`);
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

        </>
    )
}

export default DisplayNewPoll;