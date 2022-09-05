import React, { useState} from "react";
import  { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity
} from "react-native"

import database from "../../config/firebaseconfig";
import styles from "./style";



export default function Details({ navigation, route }) {

    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id



    function editText( description, id ){
        database.collection("tasks").doc(id).update({
            description: descriptionEdit,
        })
        navigation.navigate('Task')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.inputText}
                placeholder="Estudar Javascript"
                onChangeText={setDescriptionEdit}
                value= {descriptionEdit}
            />
            <TouchableOpacity
                style={styles.buttonNewText}
                onPress={()=>{
                    editText(descriptionEdit, idTask)
                }}
            >
                <Text
                    style={styles.iconButton}
                >Save</Text>
            </TouchableOpacity>
        </View>
    )
}