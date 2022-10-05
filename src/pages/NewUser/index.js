import React, { useState, useEffect } from "react";
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,

} from 'react-native'

import styles from './style'


import firebase from "../../config/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons"



export default function NewUser({navigation}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorRegister, setErrorRegister] = useState('')

    const register = () =>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential) =>{
        let user = userCredential.user;
        navigation.navigate("Task",{idUser: user.uid})
    })
    .catch((error) =>{
        setErrorRegister(true)
        let erroCode = error.code;
        let erroMessage = error.message;
    })

        
    }


    return(
        <KeyboardAvoidingView
        behavior= {Platform.OS === "ios" ? "padding": "height"}
        style={styles.container}
        >
            <Text style={styles.title}> Create a Tasks account </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter you e-mail"
                type= "text"
                onChangeText={(text)=> setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Enter a password"
                type= "text"
                onChangeText={(text)=> setPassword(text)}
                value={password}
            />

            { errorRegister === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />

                    <Text style={styles.warningAlert}>
                        Invalid e-mail or password
                    </Text>
                </View>
            :
                <View/>

            }

            { email === "" || password === ""
            ?
                <TouchableOpacity 
                    disabled={true}
                    style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>
                        Register
                    </Text>
                </TouchableOpacity>
            :
                <TouchableOpacity 
                    onPress={register}
                    style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>
                        Register
                    </Text>
                </TouchableOpacity>

            }

                <Text style={styles.login}>
                    already register ?
                    <Text 
                        style={styles.linkLogin} 
                        onPress={()=> navigation.navigate("Login")}
                    >
                        Login...
                    </Text>
                </Text>

                <View style={{height:100}}/>

        </KeyboardAvoidingView>
    )
}