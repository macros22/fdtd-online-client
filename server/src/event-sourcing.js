const express = require('express');
const cors = require('cors');
const EventEmitter = require('events')
const addon = require('napi-physics-modeling-oop');

const PORT = 5000;
const emitter = new EventEmitter();
const app = express()

app.use(cors())
app.use(express.json())


let intervalId = null;

app.get('/connect/lab1', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    console.log("connected")
    emitter.on('newDataLab1', ({dataX, dataY, step, row, col}) => {
        res.write(`data: ${JSON.stringify(
            {
                dataX,
                dataY,
                step,
                row,
                col
            })} \n\n`);
    })

    req.on("close", function() {

        // Breaks the interval loop on client disconnected
        if(intervalId) {
            clearInterval(intervalId);
            console.log('App closed. Interval cleared');
        }

    });
})

app.post('/nextLayer/lab1', ((req, res) => {
    let { lambda, tau, n1, reload, type } = req.body;

    startSendingData([lambda, tau, n1], reload, type);

    res.status(200)
    res.json({ lambda, tau, n1 })
}))

app.get('/pause/lab1', ((req, res) => {
    stopInterval();
    res.status(200);
    res.json({ message: "Data sending paused" });
}))



const stopInterval = () => {
    if( intervalId ) {
        clearInterval(intervalId);
        console.log('Interval cleared');
    }
}

const newIntervalLab1 = async ( condition, reload = true) => {

    let data = await addon.getFDTD_2D(condition, reload);
    emitter.emit('newDataLab1', data);

    intervalId = setInterval(async () => {
        data = await addon.getFDTD_2D(condition, false);
        data = {
            dataX: data.dataX,
            dataY: data.dataY,
            step: data.currentTick,
            row: 1,
            col: data.col}

        emitter.emit('newDataLab1', data);
    }, 100)
}

/// 3D
app.get('/connect/lab2', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    console.log("connected")
    emitter.on('newDataLab2', ({dataX, dataY, dataEz, dataHy, dataHx, dataEnergy, step, row, col}) => {
        res.write(`data: ${JSON.stringify(
            {
                dataX,
                dataY,
                dataEz,
                dataHy,
                dataHx,
                dataEnergy,
                step,
                row,
                col
            })} \n\n`);
    })

    req.on("close", function() {

        // Breaks the interval loop on client disconnected
        if(intervalId) {
            clearInterval(intervalId);
            console.log('App closed. Interval cleared');
        }

    });
})

app.post('/nextLayer/lab2', ((req, res) => {
    let { lambda, beamsize, n1, reload, type } = req.body;

    startSendingData([lambda, beamsize, n1], reload, type);

    res.status(200)
    res.json({ lambda, beamsize, n1 })
}))

app.get('/pause/lab2', ((req, res) => {
    stopInterval();
    res.status(200);
    res.json({ message: "Data sending paused" });
}))



// const stopInterval = () => {
//     if( intervalId ) {
//         clearInterval(intervalId);
//         console.log('Interval cleared');
//     }
// }

const newIntervalLab2 = async ( condition, reload = true) => {

    let data = await addon.getFDTD_3D(condition, reload);
    //emitter.emit('newDataLab2', data);

    intervalId = setInterval(async () => {
        for(let j = 0; j < 8; ++j){
            data = await addon.getFDTD_3D(condition, false);
        }
        data = {
            dataX: data.dataX,
            dataY: data.dataY,
            dataEz: data.dataEz,
            dataHy: data.dataHy,
            dataHx: data.dataHx,
            dataEnergy: data.dataEnergy,
            step: data.currentTick,
            row: data.col,
            col: data.col}

        emitter.emit('newDataLab2', data);
    }, 2000)
}



const startSendingData = async ( condition, reload, type ) => {

    if (type == "2D") {
        // Closing previous interval.
        stopInterval();
        newIntervalLab1(condition, reload);

    }else if (type == '3D') {

        // Closing previous interval.
        stopInterval();
        newIntervalLab2(condition, reload);
      //  let data = await addon.getFDTD_3D(condition, reload);
      //  console.log(data)
       // emitter.emit('newDataLab2', data);

    }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))