import React, { Component, useEffect } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import Dishdetail from "./DishdetailComponent";
import Reservation from "./ReservationComponent";
import {
  View,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon } from "react-native-elements";

import { SafeAreaView } from "react-navigation";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

const Stack = createStackNavigator();

import { connect } from "react-redux";
import {
  fetchDishes,
  fetchPromos,
  fetchComments,
  fetchLeaders,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const CustomDrawerContentComponent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 50, height: 50 }}
              resizeMode={"cover"}
              source={require("./images/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>

        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DAB",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

const MenuNavigator = ({ navigation }) => {
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
            headerLeft: () => (
              <View style={{ marginLeft: 12, marginTop: 3 }}>
                <Icon
                  name="menu"
                  size={24}
                  style={{ marginLeft: 20 }}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            ),
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

const HomeNavigator = ({ navigation }) => {
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
            headerLeft: () => (
              <View style={{ marginLeft: 12, marginTop: 3 }}>
                <Icon
                  name="menu"
                  size={24}
                  color="white"
                  style={{ marginLeft: 20 }}
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ContactNavigator = ({ navigation }) => {
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
            headerLeft: () => (
              <View style={{ marginLeft: 12, marginTop: 3 }}>
                <Icon
                  name="menu"
                  size={24}
                  style={{ marginLeft: 20 }}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AboutusNavigator = ({ navigation }) => {
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
            headerLeft: () => (
              <View style={{ marginLeft: 12, marginTop: 3 }}>
                <Icon
                  name="menu"
                  size={24}
                  style={{ marginLeft: 20 }}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ReservationNavigator = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{
            title: "Reservation",

            headerStyle: {
              backgroundColor: "#512DA8",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
            headerLeft: () => (
              <View style={{ marginLeft: 12, marginTop: 3 }}>
                <Icon
                  name="menu"
                  size={24}
                  style={{ paddingLeft: 80 }}
                  color="white"
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName={HomeNavigator}
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        drawerContentOptions={{
          activeTintColor: "#e91e63",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Menu"
          component={MenuNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Reservation"
          component={ReservationNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="cutlery"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={22}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutusNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
