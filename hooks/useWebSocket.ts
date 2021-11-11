// import React from 'react';


// import { SERVER_URL } from 'constants/url';

// export const useWebSocket = () => {
//     const [isWSocketConnected, setIsWSocketConnected] = React.useState<boolean>(false);
//     const [socket, setSocket] = React.useStte<WebSocket | null>(null);

//     function connectWebSocket() {
//         const socket = new WebSocket(SERVER_URL);
    
//         if (socket) {
//           socket.onopen = () => {
//             setIsWSocketConnected(true);
//           };
    
//           socket.onmessage = (event: any) => {
//             let data = JSON.parse(event.data);
    
//             let { dataX, dataY, step, col } = data;
//             setStep(step || 0);
    
//             let tmpDataChart = [];
//             for (let j = 0; j < col; j++) {
//               tmpDataChart.push({
//                 argument: dataX[j],
//                 value: dataY[j],
//               });
//             }
//             setDataChart(tmpDataChart);
    
//             setStep(data.step || 0);
//           };
    
//           socket.onclose = () => {
//             console.log('Socket закрыт');
//             setIsWSocketConnected(false);
//           };
    
//           socket.onerror = () => {
//             console.log('Socket произошла ошибка');
//             setIsWSocketConnected(false);
//           };
//         }
//         setSocket(socket);
//       }
    
//       const startDataReceiving = () => {
//         setPause(false);
    
//         const message = {
//           event: 'start',
//           type: '2D',
//           condition: [lambda, tau, n1],
//         };
    
//         if (socket !== null) {
//           socket.send(JSON.stringify(message));
//         }
//       };
    
//       const pauseDataReceiving = () => {
//         const message = {
//           event: 'pause',
//         };
    
//         if (socket !== null) {
//           socket.send(JSON.stringify(message));
//         }
//       };
    
//       const continueDataReceiving = () => {
//         const message = {
//           event: 'continue',
//         };
    
//         if (socket !== null) {
//           socket.send(JSON.stringify(message));
//         }
//       };

// }