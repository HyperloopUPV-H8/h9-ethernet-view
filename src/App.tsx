import "./App.css";
import {
    WsHandlerProvider,
    createWsHandler,
    useConfig,
    useFetchBack,
    Loader,
} from "common";
import { HomePage } from "pages/HomePage/HomePage";
import store from "store";
import { SplashScreen } from "components/SplashScreen/SplashScreen";

function App() {
    const config = useConfig();
    const podDataDescriptionPromise = useFetchBack(
        import.meta.env.PROD,
        config.paths.podDataDescription
    );

    const { initMeasurements, initPodData, setBackendConnection } = store;

    const SERVER_URL = import.meta.env.PROD
        ? `${config.prodServer.ip}:${config.prodServer.port}/${config.paths.websocket}`
        : `${config.devServer.ip}:${config.devServer.port}/${config.paths.websocket}`;

    return (
        <div className="App">
            <Loader
                promises={[
                    createWsHandler(
                        SERVER_URL,
                        true,
                        () => setBackendConnection(true),
                        () => setBackendConnection(false),
                    ),
                    podDataDescriptionPromise.then((adapter) => {
                        initPodData(adapter);
                        initMeasurements(adapter);
                    }),
                ]}
                LoadingView={<SplashScreen />}
                FailureView={<div>Failure</div>}
            >
                {([handler]) => (
                    <WsHandlerProvider handler={handler}>
                        <HomePage />
                    </WsHandlerProvider>
                )}
            </Loader>
        </div>
    );
}

export default App;
