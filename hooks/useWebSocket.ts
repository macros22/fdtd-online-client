import { SERVER_URL } from 'constants/url';
import { DisplayedDataType } from 'pages/lab3';
import { dataType } from 'types/types';



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
}

// type PropsType = () => ({
//     connectWS: ({ setIsWSocketConnected, setStep, setAllData, setSocket }: IConnectWS) => void;
// });


export const useWebSocket = () => {
    let socket: WebSocket;
    const connectWS = ({ setIsWSocketConnected, setStep, setAllData, setSocket }: IConnectWS): void => {
        socket = new WebSocket(SERVER_URL);

        if (socket) {
            socket.onopen = () => {
                setIsWSocketConnected(true);
            };

            socket.onmessage = (event: any) => {
                let data = JSON.parse(event.data);
                setStep(data.step || 0);
                console.log(Object.keys(data));
                setAllData(data);
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


    const startDataReceiving = ({ setPause, displayedData, currentDisplayingData, condition, matrix }: IStartDataReceiving) => {
        setPause(false);

        const message = {
            event: "start",
            type: "DIFRACTION",
            dataToReturn: displayedData[currentDisplayingData].type,
            condition,
            matrix,
        };

        if (socket !== null) {
            socket.send(JSON.stringify(message));
        }
    };


    const pauseDataReceiving = () => {
        const message = {
            event: "pause",
        };

        if (socket !== null) {
            socket.send(JSON.stringify(message));
        }
    };

    const continueDataReceiving = () => {
        const message = {
            event: "continue",
        };

        if (socket !== null) {
            socket.send(JSON.stringify(message));
        }
    };

    return { connectWS, startDataReceiving, pauseDataReceiving, continueDataReceiving };
}