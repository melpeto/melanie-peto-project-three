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
        const newPollRef = push(dbRef, { userQuestion, responseA, responseB, countA, countB });
        setPollNumber(newPollRef.key);
        setUserQuestion('');
        setResponseA('');
        setResponseB('');
        //following 2 lines have no real function but netlify won't deploy unless setCountA and setCountB are used in the code
        setCountA(countA); 
        setCountB(countB);  
        setIsDisplayed(true);
    }

    return (
        <div className="creation tightWrapper">

            <p className="pollInstructions">Enter a question and two possible answers for your voters to choose, and click "Submit".</p>
            <form action="submit" onSubmit={handleSubmit}>

                <div className="inputBlock">
                <label htmlFor="userQ">Poll Question</label>
                <input required type="text" id="userQ" value={userQuestion} onChange={handleQuestionChange} />
                </div>

                <div className="inputBlock">
                <label htmlFor="resA">Response 1</label>
                <input required type="text" id="resA" value={responseA} onChange={handleResAChange} />
                </div>

                <div className="inputBlock">
                <label htmlFor="resB">Response 2</label>
                <input required type="text" id="resB" value={responseB} onChange={handleResBChange} />
                </div>

                <button type="submit">Submit</button>

                <div className={`seePoll ${isDisplayed ? "seeYours" : ""}`}>
                    <Link to={`/${pollNumber}`}>See your new poll!</Link>
                </div>

            </form>

        </div>
    )
}

export default Creation;