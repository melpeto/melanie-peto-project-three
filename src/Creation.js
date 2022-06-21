import { useState } from "react";
import firebase from './firebase.js';
import {getDatabase, ref, push} from  'firebase/database';
import { Link } from "react-router-dom";

const Creation = () => {

    const [userQuestion, setUserQuestion] = useState('');
    const [responseA, setResponseA] = useState('');
    const [responseB, setResponseB] = useState('');
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [pollNumber, setPollNumber] = useState('');

    const handleQuestionChange = (event) => {
        setUserQuestion(event.target.value);
    };

    const handleResAChange = (event) => {
        setResponseA(event.target.value)
    };

    const handleResBChange = (event) => {
        setResponseB(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        //push the values of the 3 inputs to the database, they become properties on an object
        const newPollRef = push(dbRef, { userQuestion, responseA, responseB, countA, countB });
        setPollNumber(newPollRef.key);
        // setPoll(newPollRef);
        setUserQuestion('');
        setResponseA('');
        setResponseB('');
    }

    return (
        <div className="creation">
            <form action="submit" onSubmit={handleSubmit}>

                <label htmlFor="userQ">Enter your poll question here:</label>
                <input required type="text" id="userQ" value={userQuestion} onChange={handleQuestionChange} />

                <label htmlFor="resA">Enter one possible response here:</label>
                <input required type="text" id="resA" value={responseA} onChange={handleResAChange} />

                <label htmlFor="resB">Enter another possible response here:</label>
                <input required type="text" id="resB" value={responseB} onChange={handleResBChange} />

                <button type="submit">Submit</button>

            </form>

            <Link to={`/${pollNumber}`}>See your poll</Link>

            {/* <Link to="/poll">See your poll</Link> */}

            <Link to="/allpolls">See all active polls</Link>

        </div>
    )
}

export default Creation;