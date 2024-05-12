const fs = require("fs");
const compareImages = require("resemblejs/compareImages");
const config = require("../../../config.json");

const { options } = config;

function ensureDirSync(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function getFormattedDatetime() {
	return new Date().toISOString().split("T")[0];
}

async function saveComparisonReport(datetime, resultsPath, stringId) {
	const data = await compareImages(
		fs.readFileSync(`${resultsPath}/${stringId}-before.png`),
		fs.readFileSync(`${resultsPath}/${stringId}-after.png`),
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
		filePathBefore: `${stringId}-before.png`,
		filePathAfter: `${stringId}-after.png`,
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

	fs.copyFileSync("./index.css", `${resultsPath}/index.css`);
}

function browser(b, info) {
	return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${info.stringId}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${info.filePathBefore}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${info.filePathAfter}" id="testImage" label="Test">
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
            <h1>Report for
                 <a href="ghost-app"> ghost-app</a>
            </h1>
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
