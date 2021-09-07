const express = require('express');
const cors = require('cors');
const EventEmitter = require('events')
const addon = require('napi-physics-modeling-oop');

const PORT = 5000;
const emitter = new EventEmitter();
const app = express()

app.use(cors())
app.use(express.json())

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
})

app.post('/nextLayer', ((req, res) => {
    const { lambda, tau, n1, reload, type} = req.body;

    intervalData(lambda, tau, n1, reload, type);

    res.status(200)
    res.json({ lambda, tau, n1 })
}))

const intervalData = async (lambda, tau, n1, reload, type) => {
    let data = {};

    if (type == "2D") {

        const condition = [+lambda, +tau, +n1];
        const reload = false;

        data = await addon.getFDTD_2D(condition, reload);
        emitter.emit('newData', data);

        // for(let i = 0; i <= 300; ++i){
        //   data = await addon.getFDTD_2D(condition, reload);
        // }
        //
        // data = {
        //     dataX : [0, 2, 5],
        //     dataY : [2, 1, 8],
        //     row: 1,
        //     col: 3}


     //   emitter.emit('newData', data);

        setInterval(async () => {
            data = await addon.getFDTD_2D(condition, reload);
            data = {
                dataX: data.dataX,
                dataY: data.dataY,
                row: 1,
                col: data.col}

            emitter.emit('newData', data);
        }, 50)


    }
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))