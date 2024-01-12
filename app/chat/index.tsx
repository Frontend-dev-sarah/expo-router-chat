import { GiftedChat } from "react-native-gifted-chat";
import React, { useCallback, useEffect, useState, useLayoutEffect } from "react";

import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";


const ChatScreen = () => {
    const [messages, setMessages] = useState<any[]>([] as any);

    useEffect(() => {
        setMessages([
            {
                _id: '',
                text: "",
                createdAt: '',
                user: {
                    _id: '',
                    name: "",
                },
            },
        ]);
    }, []);
    const router = useRouter();
    const navigation = useNavigation();

    const onSend = useCallback((messages: any[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    const signOutUser = async () => {
        try {
            await signOut(auth);
            router.push('/(modals)/login');
        } catch (error) {
            console.log(error);
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AntDesign.Button name="logout" size={24} color="#f57c00" backgroundColor='#fff' onPress={signOutUser} />
            )
        })
    }, [navigation]);

    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(database, 'chats'), orderBy('createdAt', 'desc')),
            snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        );
        return unsubscribe;
    }, []);


    return (
        <GiftedChat
            textInputStyle={{
                borderRadius: 20,
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff',
            }}
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
        />
    );
};

export default ChatScreen;
