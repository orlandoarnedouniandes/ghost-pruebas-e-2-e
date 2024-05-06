const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const execPromise = util.promisify(exec);

// File paths
const sourceFiles = [
	"features/e4/e4.feature",
	// "features/e5/e5.feature",
	// "features/e9/e9.feature",
	// "features/e10/e10.feature",
	// "features/e11/e11.feature",
	// "features/e12/e12.feature",
	// "features/e13/e13.feature",
	// "features/e14/e14.feature",
	// "features/e15/e15.feature",
	// "features/e16/e16.feature",
	// "features/e17/e17.feature",
	// "features/e18/e18.feature",
	// "features/e19/e19.feature",
	// "features/e20/e20.feature",
];
const destinationFile = "features/execute.feature";

// Async function to process files sequentially
async function processFilesSequentially() {
	for (const sourceFile of sourceFiles) {
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
