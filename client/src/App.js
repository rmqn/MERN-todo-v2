import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import bg from '../src/assets/img/background.webp';
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const useStyles = makeStyles(() => ({
  main: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    height: "100vh",
    width:"100%",
    
    zIndex:"-1"
  },
}));

const App = () => {

  const classes = useStyles()

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <div className={classes.main}>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
};

export default App;