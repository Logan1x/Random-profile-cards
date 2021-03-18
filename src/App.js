import "./styles.css";
import React, {useState, useEffect} from 'react';
// import { readdata } from "./readdata";

export default function App() {

  const [user, setUser] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false);

  const fetchUser = async () => {
      let response = await fetch('https://randomuser.me/api');
      let json = await response.json();
      console.log(json)
      return {success: true, data: json};
    
    }
  

  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      let res = await fetchUser();
      if (res.success) {
        // console.log(res.data.results)
        setUser(res.data.results[0]);
        setUserLoaded(true);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1>Random Profile Cards</h1>
      {userLoaded ? (
        <div className="flex-parent">
          <div className="flex-child"><img src={user.picture.large} alt="Profile picture" /></div>
          <div className="vr"></div>
          <div className="flex-child">
            <ul>
            <li><strong>Name :</strong> {user.name.first} {user.name.last}</li>
            <li><strong>Email :</strong> {user.email}</li>
            <li><strong>Location :</strong> {user.location.city}, {user.location.country}</li>
          </ul>
          </div>
        </div>
        
      ) : (
        <p>No user found, please try again</p>
      )}
    <h5>Based on <a href="https://randomuser.me">Random User API</a></h5>
    <footer>Made By Khushal Sharma</footer>
    </div>
  );
}
