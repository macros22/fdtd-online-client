import React from 'react';
import {HeatMap, Paper} from "../../components";


const min = -1;
const max = 1.1;

const WebSocketChat = () => {
    const [data, setData] = React.useState("ASD");
    const [value, setValue] = React.useState('');
    const socket = React.useRef()
    const [connected, setConnected] = React.useState(false);
    const [username, setUsername] = React.useState('')

    const condition = [1,6,1];

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'nextLayer',
                reload: false,
                condition,
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {

            let data = JSON.parse(event.data);
            setData(data);


        }


        socket.current.onclose= () => {
            console.log('Socket закрыт')
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        // const message = {
        //     username,
        //     message: value,
        //     id: Date.now(),
        //     event: 'message'
        // }
        // socket.current.send(JSON.stringify(message));
        // setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <div>
                    <div className="form">
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Введите ваше имя"/>
                        <button onClick={connect}>Войти</button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
        <HeatMap
            minVal={min}
            maxVal={max}
            dataX={data.dataX}
            dataY={data.dataY}
            dataVal={data.dataEz}
        />
    <HeatMap
        minVal={min}
        maxVal={max}
        dataX={data.dataX}
        dataY={data.dataY}
        dataVal={data.dataEnergy}
    />
            <HeatMap
                minVal={min}
                maxVal={max}
                dataX={data.dataX}
                dataY={data.dataY}
                dataVal={data.dataHy}
            />
            <HeatMap
                minVal={min}
                maxVal={max}
                dataX={data.dataX}
                dataY={data.dataY}
                dataVal={data.dataHx}
            />
    </>
    );
};

export default WebSocketChat;