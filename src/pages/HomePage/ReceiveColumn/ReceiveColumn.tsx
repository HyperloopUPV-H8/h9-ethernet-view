import { TabLayout } from "layouts/TabLayout/TabLayout";
import { ChartMenu } from "components/ChartMenu/ChartMenu";
import { ReactComponent as IncomingMessage } from "assets/svg/incoming-message.svg";
import { ReactComponent as Chart } from "assets/svg/chart.svg";
import { ReceiveTable } from "components/ReceiveTable/ReceiveTable";
import { useMemo } from "react";
import { useSubscribe } from "common";
import { createSidebarSections } from "components/ChartMenu/sidebar";
import store from "store";

export const ReceiveColumn = () => {
    const { podData, updatePodData, updateMeasurements } = store;

    useSubscribe("podData/update", (update) => {
        // dispatch(updatePodData(update));
        // dispatch(updateMeasurements(update));
        updatePodData(update);
        updateMeasurements(update);
    });

    const sections = useMemo(() => {
        return createSidebarSections(podData);
    }, []);

    const receiveColumnTabItems = useMemo(
        () => [
            {
                id: "receiveTable",
                name: "Packets",
                icon: <IncomingMessage />,
                component: (
                    <ReceiveTable boards={podData.boards} />
                ),
            },
            {
                id: "charts",
                name: "Charts",
                icon: <Chart />,
                component: <ChartMenu sidebarSections={sections} />,
            },
        ],
        [store]
    );

    return <TabLayout items={receiveColumnTabItems}></TabLayout>;
};
