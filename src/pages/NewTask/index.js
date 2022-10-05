import React, { useState} from "react";
import  { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity
} from "react-native"

import firebase from "../../config/firebaseconfig";
import styles from "./style";


export default function NewTask({ navigation , route}) {
    console.log(route);

    const [description, setDescription] = useState(null)
    const database = firebase.firestore()

    function addTask(){
        database.collection(route.params.idUser).add({
            description: description,
            status: false
        })
        navigation.navigate("Task",{idUser: route.params.idUser})
    }


    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Estudar Javascript"
                onChangeText={setDescription}
                value={description}
            />
            <TouchableOpacity
                style={styles.buttonNewText}
                onPress={addTask}
            >
                <Text
                    style={styles.iconButton}
                >Save</Text>
            </TouchableOpacity>
        </View>
    )
}