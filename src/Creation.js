import { useState } from "react";
import firebase from './firebase.js';
import {getDatabase, ref, push} from  'firebase/database';
import {useNavigate} from "react-router-dom";
import SeeAllPollsButton from "./SeeAllPollsButton.js";

const Creation = () => {

    const [userQuestion, setUserQuestion] = useState('');
    const [responseA, setResponseA] = useState('');
    const [responseB, setResponseB] = useState('');
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    const navigate = useNavigate();

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
        setUserQuestion('');
        setResponseA('');
        setResponseB('');
        navigate(`/${newPollRef.key}`);
        //following 2 lines have no explicit functionality but netlify won't deploy unless setCountA and setCountB are used in the code. Using countA and countB in this component as part of the .push so that they become key-value pairs in firebase
        setCountA(countA);
        setCountB(countB);
    }

    return (

        <>
        
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

                <button type="submit">See Your New Poll</button>

            </form>

        </div>

        <SeeAllPollsButton />
        </>
    )
}

export default Creation;