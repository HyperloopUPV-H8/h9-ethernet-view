import { useSubscribe } from "common";
import store from "store"

export function useMeasurements() {
    const { updateMeasurements } = store;

    useSubscribe("podData/update", (msg) => {
        updateMeasurements(msg);
    });
}
