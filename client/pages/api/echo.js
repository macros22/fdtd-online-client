import addon from 'napi-physics-modeling-oop';

// import { NextApiRequest, NextApiResponse } from 'next'

export default async function echo(req, res) {
  console.log(addon);

  if (req.query.type == '2D') {
    console.log(req.url);
    const { lambda, tau, n1, reloadStr } = req.query;
    const condition = [+lambda, +tau, +n1];
    const reload = false;

    let data = await addon.getFDTD_2D(condition, reload);
    console.log(data);
    // for(let i = 0; i <= 30; ++i){
    //   data = await addon.getFDTD_2D(condition, reload);
    // }

    // let dataX = data.dataX;
    // let dataY = data.dataY;

    res.status(200).json({
      dataX: data.dataX,
      dataY: data.dataY,
      row: data.row,
      col: data.col,
    });
  } else if (req.query.type == '3D') {
    const { lambda, beamsize, n1 } = req.query;
    const condition = [+lambda, +beamsize, +n1];

    const dataX = [];
    const dataY = [];
    const dataEz = [];
    const dataHy = [];
    const dataHx = [];
    const dataEnergy = [];

    const data = await addongetFDTD_3D(condition);
    for (let i = 0; i < data.dataX.length; i += 5) {
      dataX.push(data.dataX[i]);
      dataY.push(data.dataY[i]);
      dataEz.push(data.dataEz[i]);
      dataHy.push(data.dataHy[i]);
      dataHx.push(data.dataHx[i]);
      dataEnergy.push(data.dataEnergy[i]);
    }

    res.status(200);
    res.json({
      // dataX: data.dataX,
      // dataY: data.dataY,
      // dataEz: data.dataEz,
      // dataHy: data.dataHy,
      // dataHx: data.dataHx,
      // dataEnergy: data.dataEnergy,
      // row: data.row,
      dataX,
      dataY,
      dataEz,
      dataHy,
      dataHx,
      dataEnergy,
      row: dataX.length,
      col: data.col,
      eachNumStep: data.eachNumStep * 5,
    });
  } else if (req.query.type == 'main') {
    res.status(200);
    res.json({
      isOK: true,
    });
  }
}