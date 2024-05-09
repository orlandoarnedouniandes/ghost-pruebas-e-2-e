const fs = require("fs");
const compareImages = require("resemblejs/compareImages");
const config = require("../config.json");

const { options } = config;

function ensureDirSync(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function getFormattedDatetime() {
	return new Date().toISOString().split("T")[0];
}

async function saveComparisonReport(
	datetime,
	resultsPath,
	stringId,
	v1Path,
	v2Path
) {
	console.log(resultsPath);
	const data = await compareImages(
		fs.readFileSync(`${v1Path}`),
		fs.readFileSync(`${v2Path}`),
		options
	);

	const resultInfo = {
		isSameDimensions: data.isSameDimensions,
		dimensionDifference: data.dimensionDifference,
		rawMisMatchPercentage: data.rawMisMatchPercentage,
		misMatchPercentage: data.misMatchPercentage,
		diffBounds: data.diffBounds,
		analysisTime: data.analysisTime,
		browser: "chromium",
		v1Path: v1Path,
		v2Path: v2Path,
		filePathCompare: `${stringId}-compare.png`,
		stringId: stringId,
	};

	fs.writeFileSync(
		`${resultsPath}/${resultInfo.filePathCompare}`,
		data.getBuffer()
	);

	fs.writeFileSync(
		`${resultsPath}/${stringId}-report.html`,
		createReport(datetime, resultInfo)
	);
}

function browser(b, info) {
	return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h4>Comparison: Ghost version 5.14 Vs 3.42</h4>
        <p>Data: ${info.stringId}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Version 1</span>
        <img class="img2" src="${info.v1Path}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Version 2</span>
        <img class="img2" src="${info.v2Path}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${info.filePathCompare}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(datetime, resInfo) {
	return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
           <h1>Report for ghost-app</h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${browser(resInfo.browser, resInfo)}
            </div>
        </body>
    </html>`;
}

module.exports = {
	ensureDirSync,
	getFormattedDatetime,
	// saveScreenshot,
	saveComparisonReport,
};
