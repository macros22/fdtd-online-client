import React from "react";

import { MainLayout } from "../components/MainLayout.js";
require("url").URL;
require("url").URLSearchParams;
export default function Index({
  title,
  labName,
  isOK
}) {

  console.log("isOK: " + isOK);

  return (
    <React.Fragment>
      <MainLayout labName={labName} title={title} />
      <div>{"isOK: " + isOK}</div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
   // process.env.API_URL +
    "https://nextjs-fdtd.vercel.app/" +
      "api/echo?" +
      new URLSearchParams({
        type: "main",
      })
  );
  const data = await response.json();
  console.log(data);
  console.log("sdasd ");
  return {
    props: {
      title: "ВОЛНОВАЯ ОПТИКА",
      labName: "Выберите лабораторную",
      isOk: data.isOK,
    },
  };
}
