import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const span = {
  color: "black",
  backgroundColor: "white",
  fontSize: 30,
  fontWeight: "bold",
};

const wrapper = {
  backgroundColor: "lightgrey",

  width: "400px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
};

function Index() {
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('divToPrint');

    let printWindow = window.open('left=50000,top=50000,width=0,height=0');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div style={wrapper} id="divToPrint" onClick={printDocument}>
      <span style={span} onClick={handlePrint}>TEXT text Text</span>
      <img src="https://images.unsplash.com/photo-1606170034961-ee40e2dbe6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" width={300}/>
      <span style={span} onClick={handlePrint}>TEXT 2</span>
      <span style={span} onClick={handlePrint}>TEXT #</span>
    </div>
  );
}

export default Index;
