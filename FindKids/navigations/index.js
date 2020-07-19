import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


// import Login from "../screens/Login";
import Login from "../container/login"
import Welcome from "../screens/Welcome";
import Forgot from "../screens/Forgot";
import SignUp from "../container/signup";
import Map from "../container/Map";
import Browse from "../container/Browse";
import Listen from "../container/listen";
import Dangerous from "../container/Dangerous";
import Settings from "../screens/Settings";
import LoginForKids from "../container/LoginForKids"
import BrowseKids from "../container/BrowseKids"
import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot,
    Map,
    Browse,
    Listen,
    Dangerous,
    Settings,
    LoginForKids,
    BrowseKids
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage:()=> <Image source={require("../assets/icons/back.png")} />,
      headerShown:true,
      title: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 1,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
