#!/usr/bin/env node
import chalk from "chalk";
import degit from "degit";

import { promisify } from "node:util";
import { exec as callbackExec, spawn } from "child_process";
const exec = promisify(callbackExec);

(async () => {
  const projectName: string | undefined = process.argv[2];
  if (!projectName) {
    console.error(
      `Please specify a project name:\n  ${chalk.cyan("create-certified-app")} ${chalk.green("<project name>")}`,
    );
    process.exit(1);
  }

  const emitter = degit("Evam-life/sdk", {});

  console.log(
    `Creating a new certified app in ${chalk.green(`${process.cwd()}/${projectName}`)}`,
  );
  await emitter.clone(projectName);

  console.log("Installing packages using npm. This might take a while.");
  await new Promise<void>((resolve, reject) => {
    const npmInstall = spawn("npm", ["install"], {
      cwd: projectName,
      stdio: "inherit",
    });
    npmInstall.on("close", code => {
      if (code === 0) resolve();
      reject();
    });
  });
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
    console.error("Git commands failed, continuing...", e);
  }

  console.log(`${chalk.bold("Success!")} Created ${projectName} at ${process.cwd()}/${projectName}
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
