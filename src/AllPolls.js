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

        <h2>Click on a poll below to enter and vote!</h2>

        <ul className="allPolls">
            {list.map( (singlePoll) => {
                return (
                    
                    <li key={singlePoll.key} className="activePoll">
                        <Link to={`/${singlePoll.key}`}>
                        <h3>{singlePoll.userQuestion}</h3>
                        <div className="activePollParent">
                            <div className="res resA">
                                <p>{singlePoll.responseA}</p>
                                <p className="number">{singlePoll.countA}</p>
                            </div>
                            <div className="res resB">
                                <p>{singlePoll.responseB}</p>
                                <p className="number">{singlePoll.countB}</p>
                            </div>
                        </div>
                        </Link>
                    </li>
                    
                )
            })} 
        </ul>

        </div>

        </>
        
    )
}

export default AllPolls;