import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Logout from '../Log/Logout';
import { capitalizeFirstLetter } from '../Utils';
// MUI
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    sizeIcon: {
        fontSize: "60px",
    },
    }));

export default function User() {
    const classes = useStyles()

    const userData = useSelector((state) => state.userReducer);

    const convertForCap = () => {
      const test = userData.pseudo + ""
      const pseudo = capitalizeFirstLetter(test);
      return pseudo;
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="flex-end" p={5}>
            <Box mr={3}>
                <Typography className={classes.fontFamily} variant="body2" style={{color: "#FFFFFF"}}>Bonjour</Typography>
                <Typography className={classes.fontFamily} variant="h6" >{convertForCap()}</Typography>
                <Logout/>
            </Box>
            <AccountCircleIcon className={classes.sizeIcon}/>
        </Box>
    )
}
