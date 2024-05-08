const fs = require("fs");
const path = require("path");

const {
	ensureDirSync,
	getFormattedDatetime,
	saveComparisonReport,
	wait,
} = require("./helpers");

async function runcomparisonReport(v1FolderPath, v2FolderPath) {
	const filesInV1 = await getFilesInFolder(v1FolderPath);
	const filesInV2 = await getFilesInFolder(v2FolderPath);
	const dateTime = getFormattedDatetime();
	const resultsPath = path.join(__dirname, `/results/${dateTime}`);
	ensureDirSync(resultsPath);

	fs.copyFileSync("./index.css", `${resultsPath}/index.css`);

	for (const fileItem of filesInV2) {
		const stringId = fileItem.fileName;

		const matchingFile = filesInV1.find((f) => f.fileName.startsWith(stringId));

		if (
			matchingFile &&
			!fileItem.fileName.endsWith(".html") &&
			!fileItem.fileName.includes("-compare.") &&
			!fileItem.fileName.endsWith(".css")
		) {
			await saveComparisonReport(
				dateTime,
				resultsPath,
				stringId,
				matchingFile.filePath,
				fileItem.filePath
			);
		}
	}
}

function getFilesInFolder(folderPath) {
	return new Promise((resolve, reject) => {
		fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
			if (err) {
				reject(err);
				return;
			}
			const fileDetails = files
				.filter((file) => file.isFile())
				.map((file) => ({
					fileName: file.name,
					filePath: path.join(folderPath, file.name),
				}));
			resolve(fileDetails);
		});
	});
}

runcomparisonReport(
	"C:\\Users\\SPUA\\Documents\\Repos\\Maestria\\Pruebas automatizadas\\ghost-pruebas-e-2-e\\kraken\\results\\2024-05-08\\",
	"C:\\Users\\SPUA\\Documents\\Repos\\Maestria\\Pruebas automatizadas\\ghost-pruebas-e-2-e\\kraken_3_42\\results\\2024-05-08\\"
);
