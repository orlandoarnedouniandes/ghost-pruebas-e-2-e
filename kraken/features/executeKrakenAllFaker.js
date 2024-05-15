const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const execPromise = util.promisify(exec);

// File paths
const scenarios = [
	// "e1",
	// "e2",
	// "e3",
	// "e4",
	// "e5",
	// "e6",
	// "e7",
	// "e8",
	// "e9",
	// "e10",
	// "e11",
	// "e12",
	// "e13",
	// "e14",
	// "e15",
	"e16",
	// "e17",
	// "e18",
	// "e19",
	// "e20",
];
const destinationFile = "features/execute.feature";

// Async function to process files sequentially
async function processFilesSequentially() {
	for (const scenario of scenarios) {
		const sourceFile = `features/fakerFeatures/${scenario}/${scenario}.feature`;
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
