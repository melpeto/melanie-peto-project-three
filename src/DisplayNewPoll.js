import { useEffect, useState } from "react";
import firebase from './firebase.js';
import { getDatabase, ref, onValue, set} from 'firebase/database';
import { Link, useParams } from "react-router-dom";
import Result from "./Result.js";

const DisplayNewPoll = () => {

    const { pollNumber } = useParams();

    const [countValueA, setCountValueA] = useState(0);
    const [countValueB, setCountValueB] = useState(0);
    const [poll, setPoll] = useState([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${pollNumber}`);
    const countARef = ref(database, `/${pollNumber}/countA`);
    const countBRef = ref(database, `/${pollNumber}/countB`);

    //on initial render I want to take whats in the database and show it, for the poll that was just created
    useEffect(() => {
        // const database = getDatabase(firebase);
        // const dbRef = ref(database, `/${pollNumber}`);
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
        // const database = getDatabase(firebase);
        // const countARef = ref(database, `/${pollNumber}/countA`);
        set(countARef, newCountValueA);
    }

    const handleVoteB = () => {
        const newCountValueB = (countValueB + 1);
        setCountValueB(newCountValueB);
        set(countBRef, newCountValueB);
    }

    return (
        <>
        <p>{poll.userQuestion}</p>
        <button onClick={handleVoteA}>{poll.responseA}</button>
        <Result count={countValueA} thisPoll={poll}/>
        <button onClick={handleVoteB}>{poll.responseB}</button>
        <Result count={countValueB}/>

        <Link to="/">Make a new poll</Link>

        <Link to="/allpolls">See all active polls</Link>
        </>
    )
}

export default DisplayNewPoll;