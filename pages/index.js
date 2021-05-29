import React from "react";

import { MainLayout } from "../components/MainLayout.js";

export default function Index({
  title,
  labName
}) {
  return (
    <React.Fragment>
      <MainLayout labName={labName} title={title} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {

  return {
    props: {
      title: "ВОЛНОВАЯ ОПТИКА",
      labName: "Выберите лабораторную",
    },
  };
}
