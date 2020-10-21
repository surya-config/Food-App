import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import Dishdetail from "./DishdetailComponent";
import { View, Platform } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Menu",
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Dishdetail"
          component={Dishdetail}
          options={{
            title: "Dishdetail",
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ContactNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            title: "Contact",
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AboutusNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="About us"
          component={About}
          options={{
            title: "About us",
            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const MenuNavigator = createStackNavigator(
//   {
//     Menu: { screen: Menu },
//     Dishdetail: { screen: Dishdetail },
//   },
//   {
//     initialRouteName: "Menu",
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: "#512DA8",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//     },
//   }
// );

// const HomeNavigator = createStackNavigator(
//   {
//     Home: { screen: Home },
//   },
//   {
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: "#512DA8",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//     },
//   }
// );

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName={HomeNavigator}>
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="Menu" component={MenuNavigator} />
        <Drawer.Screen name="Contact" component={ContactNavigator} />
        <Drawer.Screen name="About" component={AboutusNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// const MainNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: HomeNavigator,
//       navigationOptions: {
//         title: "Home",
//         drawerLabel: "Home",
//       },
//     },
//     Menu: {
//       screen: MenuNavigator,
//       navigationOptions: {
//         title: "Menu",
//         drawerLabel: "Menu",
//       },
//     },
//   },
//   {
//     drawerBackgroundColor: "#D1C4E9",
//   }
// );

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
      }}
    >
      <MainNavigator />
    </View>
  );
};

export default Main;
