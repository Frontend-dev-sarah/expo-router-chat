import { StyleSheet, Text, TextInput, View } from "react-native";
import { Entypo } from '@expo/vector-icons';


import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "@/config/firebase";
import { UserContext } from "@/context/UserContext";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [user, setUser] = useState<any>({});
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Entypo name="flower" size={24} color='#f57c00' />
            ),
        });
    }, [navigation]);

    const handleSearch = async () => {
        setUser({});
        setSearch('');
        const q = query(collection(database, 'users'), where('displayName', '==', search));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setUser(doc.data())
        });

    };

    const addChats = async () => {
        //check if group(chats in firestore) already exists
        const combinedId = currentUser?.uid! > user?.uid ? currentUser?.uid + user?.uid : user?.uid + currentUser?.uid;

        const res = await getDocs(database, 'chats', combinedId)
        //if not, create a chat in chats collection

        //create user chats

        //then navigate to chat screen
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={search}
                autoCapitalize="none"
                onChangeText={(text) => setSearch(text)}
                placeholder="Search for a name"
                style={styles.input}
                onSubmitEditing={handleSearch}
            />
            {user && <TouchableOpacity onPress={addChats} style={styles.userItem}>
                <Text>{user.displayName}</Text>
            </TouchableOpacity>}
            <Link href={'/chat/'} asChild>
                <TouchableOpacity
                    style={styles.chatButton}>
                    <Entypo name="chat" size={24} color='#f57c00' />
                </TouchableOpacity>
            </Link>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    input: {
        backgroundColor: "#F6F7FB",
        padding: 15,
        margin: 20,
        borderRadius: 10,
        width: '90%',
    },
    userItem: {
        padding: 15,
        margin: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 50,
        flex: 1,
        alignSelf: 'stretch',
    },
    chatButton: {
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f57c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    }
});
export default HomeScreen;
