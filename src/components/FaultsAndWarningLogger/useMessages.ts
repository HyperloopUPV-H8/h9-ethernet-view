import { useInterval } from "hooks/useInterval";
import { Message } from "models/Message";
import { Message as MessageAdapter } from "adapters/Message";
import { useWebSocketBroker } from "services/WebSocketBroker/useWebSocketBroker";

import { updateMessages } from "slices/messagesSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { store } from "../../store";

export function useMessages() {
    const dispatch = useDispatch();

    useWebSocketBroker("message/update", (msg) => {
        dispatch(updateMessages(msg));
    });

    const [messages, setMessages] = useState({
        fault: [] as Message[],
        warning: [] as Message[],
    });

    useInterval(() => {
        const state = store.getState();
        setMessages({
            fault: state.messages.fault,
            warning: state.messages.warning,
        });
    }, 1000 / 70);

    return messages;
}
