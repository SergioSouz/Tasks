import React ,{ useState, useEffect } from "react";
import  { 
    View, 
    Text, 
    TouchableOpacity,
    FlatList
} from "react-native"

import firebase from "../../config/firebaseconfig";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "./style";


export default function  Task({ navigation, route }) {
    console.log(route);

    const [ task , setTask] = useState([])
    const database = firebase.firestore()

    function logout(){
        firebase.auth().signOut().then(()=>{
            navigation.navigate("Login")
        }).catch((error)=>{

        });
    }


    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).delete()
    }

    useEffect(() =>{
        database.collection(route.params.idUser).onSnapshot((query)=>{
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
                                    description: item.item.description,
                                    idUser: route.params.idUser
                                })
                            }}

                            >
                                {item.item.description }
                            </Text>
                        
                        </View>
                    )
                }}
            />
            
            {/* button add */}
            <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={()=> navigation.navigate("NewTask",{idUser: route.params.idUser})}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity> 


            {/* button de sair */}
            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={()=>{ logout()}}
            >
                <Text style={styles.iconButtonLogout}>
                    <MaterialCommunityIcons
                        name="location-exit"
                        size={23}
                        color="#F92E6A"
                    />
                </Text>
            </TouchableOpacity>


        </View>
    )
}