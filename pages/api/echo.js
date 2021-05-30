import addon from "napi-physics-modeling-oop";

export default async function echo(req, res) {
  if (req.query.type == "2D") {
    const { lambda, tau, n1 } = req.query;
    const condition = [+lambda, +tau, +n1];

    const data = await addon.addonFDTD.getFDTD_2D(condition);
    const dataX = [];
    const dataY = [];

    for(let i = 0; i < data.dataX.length; i+= 10)
    {
      dataX.push(data.dataX[i]);
      dataY.push(data.dataY[i]);
    }

    res.status(200).json({
      dataX,
      dataY,
      row: dataX.length,
      col: data.col,
    });
  } else if (req.query.type == "3D") {
    const { lambda, beamsize, n1 } = req.query;
    const condition = [+lambda, +beamsize, +n1];

    const dataX = [];
    const dataY = [];
    const dataEz = [];
    const dataHy = [];
    const dataHx = [];
    const dataEnergy = [];
    
  const data = await addon.addonFDTD.getFDTD_3D(condition);
    for (let i = 0; i < data.dataX.length; i += 10) {
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
      eachNumStep: data.eachNumStep,
    });
  } else if (req.query.type == "main") {


    res.status(200);
    res.json({
      isOK: true,
    });
  }
}
