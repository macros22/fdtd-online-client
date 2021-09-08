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

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    console.log("connected")
    emitter.on('newData', ({dataX, dataY, row, col}) => {
        res.write(`data: ${JSON.stringify(
            {
                dataX,
                dataY,
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

app.post('/nextLayer', ((req, res) => {
    const { lambda, tau, n1, reload, type } = req.body;

    startIntervalData(lambda, tau, n1, reload, type);

    res.status(200)
    res.json({ lambda, tau, n1 })
}))


const startIntervalData = async ( lambda, tau, n1, reload, type ) => {

    if (type == "2D") {

        const condition = [+lambda, +tau, +n1];
        const reload = true;

        let data = await addon.getFDTD_2D(condition, reload);
        emitter.emit('newData', data);

        // Closing previous interval.
        if(intervalId) {
            clearInterval(intervalId);
            console.log('Interval cleared');
        }

        intervalId = setInterval(async () => {
            data = await addon.getFDTD_2D(condition, false);
            data = {
                dataX: data.dataX,
                dataY: data.dataY,
                row: 1,
                col: data.col}

            emitter.emit('newData', data);
        }, 100)


    }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))