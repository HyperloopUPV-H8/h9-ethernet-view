import { MessageAdapter, useSubscribe } from "common";
import store from "store";


export function useMessages() {
    const { messages, addMessage } = store;

    useSubscribe("message/update", (msg: MessageAdapter) => {
        addMessage(msg);
    });

    return messages;
}
