import { Link } from "react-router-dom";
import firebase from "./firebase";
import { getDatabase, onValue, ref} from "firebase/database";
import { useEffect, useState } from "react";

const AllPolls = () => {

    const [list, setList] = useState([]);

    useEffect( () => {
        const newArray = [];
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            const dataObj = response.val();
            for (let item in dataObj) {
                newArray.push(
                    dataObj[item]
                );
            }
            setList(newArray);
        });
    }, [])

    console.log(list);

    return (
        <div>
        <ul className="allPolls">
            {list.map( (singlePoll, index) => {
                return (
                    <li key={index}>
                        <h3>{singlePoll.userQuestion}</h3>
                        <p>{singlePoll.responseA}</p>
                        <p>{singlePoll.countA}</p>
                        <p>{singlePoll.responseB}</p>
                        <p>{singlePoll.countB}</p>
                    </li>
                )
            })} 
        </ul>

        <Link to="/">Make a new poll</Link>

        </div>
    )
}

export default AllPolls;