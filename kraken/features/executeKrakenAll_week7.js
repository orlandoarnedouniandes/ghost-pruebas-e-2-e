const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const execPromise = util.promisify(exec);


const scenarios = [
	// "e21",
	// "e22",
	// "e23",
	// "e24",
	// "e25",
	// "e26",
	// "e27",
	// "e28",
	// "e29",
	// "e30",
	// "e31",
	// "e32",
	// "e33",
	// "e34",
	"e35",
	"e36",
	"e37",
	"e38",
	"e39",
	"e40",
	"e41",
	"e42",
	"e43",
	// "e44",
	// "e45",
	// "e46",
	// "e47",
	"e48",
	"e49",
	"e50",
	"e51",
	"e52",
	"e53",
	// "e54",
	// "e55",
	"e56",
	"e57",
	"e58",
	"e59",
	"e60",
	"e61",
	"e62",
	"e63",
	"e64",
	"e65",
	"e66",
	"e67",
	"e68",
	"e69",
	"e70",
	"e71",
	"e72",
	"e73",
	"e74",
	"e75",
	"e76",
	"e77",
	"e78",
	"e79",
	// "e80",
	// "e81",
	// "e82",
	// "e83",
	// "e84",
	// "e85",
	// "e86",
	// "e87",
	// "e88",
	// "e89",
	// "e90",
	// "e91",
	// "e92",
	// "e93",
	// "e94",
	// "e95",
	// "e96",
	// "e97",
	// "e98",
	// "e99",
	// "e100",
	// "e101",
	// "e102",
	// "e103",
	// "e104",
	// "e105",
	// "e106",
	// "e107",
	// "e108",
	// "e109",
	// "e110",
	// "e111",
	// "e112",
	// "e113",
	// "e114",
	// "e115",
	// "e116",
	// "e117",
	// "e118",
	// "e119",
	// "e120",
	// "e121",
	// "e122",
	// "e123",
	// "e124",
	// "e125",
	// "e126",
	// "e127",
	// "e128",
	// "e129",
	// "e130",
	// "e131",
	// "e132",
	// "e133",
	// "e134",
	// "e135",
	// "e136",
	// "e137",
	// "e138",
	// "e139",
	// "e140",
];
const destinationFile = "features/execute.feature";

// Async function to process files sequentially
async function processFilesSequentially() {
	for (const scenario of scenarios) {
		const sourceFile = `features/${scenario}/${scenario}.feature`;
		try {
			const data = await readFile(sourceFile, "utf8");

			await writeFile(destinationFile, data, "utf8");
			console.log(
				`Successfully copied from ${sourceFile} to ${destinationFile}`
			);

			// Run kraken-node command
			const { stdout, stderr } = await execPromise("npx kraken-node run");
			if (stderr) {
				console.error(`Error output from kraken-node: ${stderr}`);
			}
			console.log(`Output from kraken-node: ${stdout}`);
		} catch (err) {
			console.error(`Error processing ${sourceFile}: ${err}`);
		}
	}
}
processFilesSequentially();
