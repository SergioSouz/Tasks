import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Task from "./src/pages/Task";
import NewTask from "./src/pages/NewTask";
import Details from "./src/pages/Details";
import NewUser from "./src/pages/NewUser";
import Login from "./src/pages/Login";


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Login"
          component={Login}
          options= {{
            headerShown: false,
          }}
        
        />
         <Stack.Screen
          name="NewUser"
          component={NewUser}
          options= {{
            headerShown: false,
          }}
        
        />

        <Stack.Screen
          name="Task"
          component={Task}
          options= {{
            headerTintColor: "#f92e6a",
            headerLeft: null
          }}
        
        />
          <Stack.Screen
          name="NewTask"
          component={NewTask}
          options= {{
            headerTintColor: "#f92e6a",
          }}
        
        />
          <Stack.Screen
          name="Details"
          component={Details}
          options= {{
            headerTintColor: "#f92e6a"
          }}
        
        />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
