import { useSubscribe } from "common";
import { useMeasurementsStore } from "common";

export function useMeasurements() {
    const updateMeasurements = useMeasurementsStore(state => state.updateMeasurements)

    useSubscribe("podData/update", (msg) => {
        updateMeasurements(msg);
    });
}
