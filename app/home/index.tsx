import { Text, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import React, { useCallback, useEffect, useState } from "react";

const HomeScreen = () => {
    const [messages, setMessages] = useState([{
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: "React Native",
        },
    }]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages: IMessage[] = []) => {
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, messages)
        // );
    }, []);
    return (
        <View>
            <Text>helldfadfossia</Text>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
};

export default HomeScreen;