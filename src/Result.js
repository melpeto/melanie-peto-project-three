import firebase from "./firebase";
import { getDatabase, ref, push } from "firebase/database";

const Result = (props) => {

    // const database = getDatabase(firebase);
    // const dbRef = ref(database);

    return (
        <>
            <p className="number">{props.count}</p>
        </>
        
    )
}

export default Result;