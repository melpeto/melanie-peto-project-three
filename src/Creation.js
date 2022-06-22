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

    const [isDisplayed, setIsDisplayed] = useState(false);

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
        setUserQuestion('');
        setResponseA('');
        setResponseB('');
        setIsDisplayed(true);
    }

    return (
        <div className="creation">

            <h2>Make a Poll</h2>
            <p>Enter a question and two possible answers for your voters to choose, and click "Submit".</p>
            <form action="submit" onSubmit={handleSubmit}>

                <div className="inputBlock">
                <label htmlFor="userQ">Enter your poll question here:</label>
                <input required type="text" id="userQ" value={userQuestion} onChange={handleQuestionChange} />
                </div>

                <div className="inputBlock">
                <label htmlFor="resA">Enter one possible response here:</label>
                <input required type="text" id="resA" value={responseA} onChange={handleResAChange} />
                </div>

                <div className="inputBlock">
                <label htmlFor="resB">Enter another possible response here:</label>
                <input required type="text" id="resB" value={responseB} onChange={handleResBChange} />
                </div>

                <button type="submit">Submit</button>

            </form>

            {/* this link is hidden until user clicks Submit button */}
            <div className={`seePoll regButton ${isDisplayed ? "seeYours" : ""}`}>
                <Link to={`/${pollNumber}`}>See your new poll!</Link>
            </div>

            <div className="regButton">
                <Link to="/allpolls">See all active polls</Link>
            </div>

        </div>
    )
}

export default Creation;