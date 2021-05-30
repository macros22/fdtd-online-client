import addon from "napi-physics-modeling-oop";

export default async function echo(req, res) {
  if (req.query.type == "2D") {
    const { lambda, tau, n1 } = req.query;
    const condition = [+lambda, +tau, +n1];

    const data = await addon.addonFDTD.getFDTD_2D(condition);
    console.log("----------------------------")
  
    const dataX2 = [];
    const dataY2 = [];
    for(let i = 0; i < data.dataX.length; i+= 10)
    {
      dataX2.push(data.dataX[i]);
      dataY2.push(data.dataY[i]);
    }



    res.status(200).json({
      dataY: dataY2,
      dataX: dataX2,
      row: data.row / 10,
      col: data.col,
    });
    console.log("=========================");
  } else if (req.query.type == "3D") {
    const { lambda, beamsize, n1 } = req.query;
    const condition = [+lambda, +beamsize, +n1];

    const data = await addon.addonFDTD.getFDTD_3D(condition);
    res.status(200);
    res.json({
      dataX: data.dataX,
      dataY: data.dataY,
      dataEz: data.dataEz,
      dataHy: data.dataHy,
      dataHx: data.dataHx,
      dataEnergy: data.dataEnergy,
      row: data.row,
      col: data.col,
      eachNumStep: data.eachNumStep,
    });
  } else if (req.query.type == "main") {

    const data = [];
    data.length = 1e5;
    data.fill(5);

    res.status(200);
    res.json({
      isOK: true,
      data
    });
  }
}
