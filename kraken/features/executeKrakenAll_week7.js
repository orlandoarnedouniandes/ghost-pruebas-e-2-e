const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const execPromise = util.promisify(exec);

// File paths
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
	// "e36",
	// "e37",
	// "e38",
	// "e39",
	// "e40",
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
