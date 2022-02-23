import { SERVER_URL, SERVER_URL_LOCAL } from 'constants/url';
// const SERVER_URL = 'ws://physics-platform-server.herokuapp.com/';
import { dataType } from 'types/types';
import { DisplayedDataType } from 'utils/displayed-data';
interface IConnectWS {
    setIsWSocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setAllData: React.Dispatch<React.SetStateAction<dataType>>;
    setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>;

}
interface IStartDataReceiving {
    setPause: React.Dispatch<React.SetStateAction<boolean>>;
    displayedData: DisplayedDataType;
    currentDisplayingData: number;
    matrix: number[][];
    condition: number[];
    socket: WebSocket | null;
}

// type PropsType = () => ({
//     connectWS: ({ setIsWSocketConnected, setStep, setAllData, setSocket }: IConnectWS) => void;
// });

export const useWebSocket = () => {
    const connectWS = ({ setIsWSocketConnected, setStep, setAllData, setSocket }: IConnectWS): void => {
        const socket = new WebSocket(SERVER_URL_LOCAL);
        // console.log(socket)
        if (socket) {
            socket.onopen = () => {
                setIsWSocketConnected(true);
            };

            socket.onmessage = (event: any) => {
                let data = JSON.parse(event.data);
                setStep(data.step || 0);
                // console.log(Object.keys(data));
                setAllData(data);

                socket.send(JSON.stringify({step:data.step || 0}))
            };

            socket.onclose = () => {
                console.log('Socket закрыт');
                setIsWSocketConnected(false);
            };

            socket.onerror = () => {
                console.log('Socket произошла ошибка');
                setIsWSocketConnected(false);
            };
        }
        setSocket(socket);
    }


    const startDataReceiving = ({ setPause, displayedData, currentDisplayingData, condition, matrix, socket }: IStartDataReceiving) => {
        setPause(false);

        const message = {
            event: "start",
            type: "2D",
            // dataToReturn: displayedData[currentDisplayingData].type,
            condition,
            // matrix,
        };

        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };


    const pauseDataReceiving = (socket: WebSocket | null) => {
        const message = {
            event: "pause",
        };

        if (socket !== null) {
            socket.send(JSON.stringify(message));
        }
    };

    const continueDataReceiving = (socket: WebSocket | null) => {
        const message = {
            event: "continue",
        };

        if (socket !== null) {
            socket.send(JSON.stringify(message));
        }
    };

    return { connectWS, startDataReceiving, pauseDataReceiving, continueDataReceiving };
}