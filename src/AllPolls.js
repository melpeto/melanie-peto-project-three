import { Link } from "react-router-dom";
import firebase from "./firebase";
import { getDatabase, onValue, ref} from "firebase/database";
import { useEffect, useState } from "react";
import Header from "./Header";

const AllPolls = () => {

    // const { pollNumber } = useParams();

    const [list, setList] = useState([]);

    //I need something better than {index} for the key for each li in the return(). want to access the random key given by firebase
    // const [key, setKey] = useState('');

    //also want to click on each li and be taken to a DisplayPoll page so that the user can vote on that poll

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

    return (

        <>
        <Header />

        <div className="wrapper">

        <h2>All Active Polls</h2>

        <ul className="allPolls">
            {list.map( (singlePoll, index) => {
                return (

                    // <li key={movie.id}>
                    //     <Link to={`/movie/${movie.id}`}>
                    //         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster for the movie ${movie.original_title}`} />
                    //     </Link>
                    // </li>

                    <li key={index} className="activePoll">
                        <h3>{singlePoll.userQuestion}</h3>
                        <div className="activePollParent">
                            <div className="res">
                                <p>{singlePoll.responseA}</p>
                                <p>{singlePoll.countA}</p>
                            </div>
                            <div className="res">
                                <p>{singlePoll.responseB}</p>
                                <p>{singlePoll.countB}</p>
                            </div>
                        </div>
                    </li>

                )
            })} 
        </ul>

        <div className="regButton">
            <Link to="/">Make a new poll</Link>
        </div>

        </div>

        </>
        
    )
}

export default AllPolls;