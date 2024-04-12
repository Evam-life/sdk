#!/usr/bin/env node
import chalk from "chalk";
import degit from "degit";
import replace from "replace-in-file";

import { promisify } from "node:util";
import path from "node:path";
import { exec as callbackExec, spawn } from "child_process";
const exec = promisify(callbackExec);

const isWindows = process.platform === "win32";

(async () => {
  let projectName: string | undefined = process.argv[2]
    ?.trim()
    ?.replace(" ", "-");
  if (!projectName) {
    console.error(
      `Please specify a project name:\n  ${chalk.cyan("create-certified-app")} ${chalk.green("<project name>")}`,
    );
    process.exit(1);
  }

  const emitter = degit(
    "https://github.com/Evam-life/certified-app-template-react",
    {},
  );

  console.log(
    `Creating a new certified app in ${chalk.green(path.join(process.cwd(), projectName))}`,
  );
  await emitter.clone(projectName);

  try {
    await replace({
      disableGlobs: true,
      files: [
        path.join(process.cwd(), projectName, "package.json"),
        path.join(process.cwd(), projectName, "public", "evam.json"),
        path.join(process.cwd(), projectName, "index.html"),
      ],
      from: /certified-app-template/g,
      to: projectName,
    });
  } catch (e) {
    console.warn(
      chalk.yellow`Failed to replace default project name, make sure you update the application ID in ${chalk.bold(path.join("public", "evam.json"))}. Continuing...`,
    );
  }

  console.log("Installing packages using npm. This might take a while.");
  try {
    await new Promise<void>((resolve, reject) => {
      const npmInstall = spawn(isWindows ? "npm.cmd" : "npm", ["install"], {
        cwd: projectName,
        stdio: "inherit",
      });
      npmInstall.on("close", code => {
        if (code === 0) resolve();
        reject();
      });
    });
  } catch (e) {
    console.warn(
      chalk.yellow`Failed to install packages using npm. You will have to run ${chalk.bold("npm install")} manually. Continuing...`,
    );
  }
  console.log(""); // Line break after npm output

  try {
    await exec(`git init`, { cwd: projectName });
    console.log("Initialized a git repository.");

    await exec(`git add -A`, { cwd: projectName });
    await exec(`git commit -m "Initialize project from template"`, {
      cwd: projectName,
    });
    console.log("Created git commit.");
  } catch (e) {
    console.warn(chalk.yellow`Git commands failed, continuing...`, e);
  }

  console.log(`${chalk.green.bold("Success!")} Created ${projectName} at ${path.join(process.cwd(), projectName)}
Inside that directory, you can run several commands:

  ${chalk.cyan("npm run dev")}
    Starts the development server.
    
  ${chalk.cyan("npm run build")}
    Bundles the app into static files for production.
    
  ${chalk.cyan("npm run sideload")}
    Sideloads the app to any connected devices.
    
We suggest that you begin by typing:

  ${chalk.cyan("cd")} ${projectName}
  ${chalk.cyan("npm run dev")}
 
Check out up-to-date documentation for the Evam SDK at ${chalk.blue("https://www.documentation.evam.life")}
Happy hacking!`);
})();
