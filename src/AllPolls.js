import { Link } from "react-router-dom";
import firebase from "./firebase";
import { getDatabase, onValue, ref} from "firebase/database";
import { useEffect, useState } from "react";
import Header from "./Header";
import MakeAPollButton from "./MakeAPollButton";

const AllPolls = () => {

    const [list, setList] = useState([]);

    useEffect( () => {
        const newArray = [];
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            const dataObj = response.val();
            for (let item in dataObj) {
                dataObj[item] = {...dataObj[item], 'key':item};
                newArray.push(
                    dataObj[item]
                );
            }
            setList(newArray);
        });
    }, [])

    return (

        <>

        
        <Header />

        <div className="wrapper">

        <MakeAPollButton />

        <h2>All Active Polls</h2>

        <ul className="allPolls">
            {list.map( (singlePoll, index) => {
                return (

                    //I need something better than {index} for the key for each li in the return(). want to access the random key given by firebase
                    //also want to click on each li and be taken to a DisplayPoll page so that the user can vote on that poll
                    
                    <li key={singlePoll.key} className="activePoll">
                        <Link to={`/${singlePoll.key}`}>
                        <h3>{singlePoll.userQuestion}</h3>
                        <div className="activePollParent">
                            <div className="res">
                                <p>{singlePoll.responseA}</p>
                                <p className="number">{singlePoll.countA}</p>
                            </div>
                            <div className="res">
                                <p>{singlePoll.responseB}</p>
                                <p className="number">{singlePoll.countB}</p>
                            </div>
                        </div>
                        </Link>
                    </li>
                    

                )
            })} 
        </ul>

        {/* <div className="regButton">
            <Link to="/">Make a new poll</Link>
        </div> */}

        </div>

        </>
        
    )
}

export default AllPolls;