import React ,{ useState, useEffect } from "react";
import  { 
    View, 
    Text, 
    TouchableOpacity,
    FlatList
} from "react-native"

import database from "../../config/firebaseconfig";
import { FontAwesome } from '@expo/vector-icons';
import styles from "./style";


export default function  Task({ navigation }) {

    const [ task , setTask] = useState([])

    function deleteTask(id){
        database.collection('tasks').doc(id).delete()
    }

    useEffect(() =>{
        database.collection("tasks").onSnapshot((query)=>{
            const list = []
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id })
            })
            setTask(list)
        })
    }, [])


    return(
        <View style={styles.container}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={(item)=>{
                    return(
                        <View style={styles.task}>
                            <TouchableOpacity 
                                style={styles.deleteTask}
                                onPress={()=> {
                                    deleteTask(item.item.id)
                                }}
                                
                            >
                            <FontAwesome
                                name ="trash"
                                size={23}
                                color="#F92e5A"
                            />
                            </TouchableOpacity>
                            <Text
                            style= {styles.DescriptionTask}
                            onPress={ () =>{
                                navigation.navigate("Details", {
                                    id: item.item.id,
                                    description: item.item.description
                                })
                            }}

                            >
                                {item.item.description }
                            </Text>
                        
                        </View>
                    )
                }}
            />
            <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={()=> navigation.navigate("NewTask")}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity> 


        </View>
    )
}