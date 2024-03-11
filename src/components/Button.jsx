import React from "react";

const arrayToCSV = (data) => {
  if (data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    headers.join(",") +
    "\n" +
    data
      .map((row) => headers.map((header) => row[header]).join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  return encodedUri;
};

const downloadCSV = (data, filename) => {
  const csvData = arrayToCSV(data);
  if (!csvData) {
    console.error("No data to download.");
    return;
  }

  const link = document.createElement("a");
  link.setAttribute("href", csvData);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Button = (props) => {
  const { data } = props;
  const handleDownload = () => {
    downloadCSV(data, "places.csv");
    console.log(data);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-[200px] mx-auto block bg-green-600 text-white p-2 rounded-lg mt-4"
    >
      Download CSV
    </button>
  );
};

export default Button;
