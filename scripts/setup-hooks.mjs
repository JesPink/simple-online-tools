import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

const preCommitHook = `#!/bin/sh
echo "Running marketplace validation..."
npm run validate
status=$?

if [ $status -ne 0 ]; then
  echo ""
  echo "Commit blocked: fix lint or type errors before committing."
  echo ""
  exit $status
fi

echo "Validation passed."
`;

const gitDirectory = path.join(projectRoot, ".git");

if (!fs.existsSync(gitDirectory)) {
    console.log("No .git directory found. Initialize git before installing hooks.");
    process.exit(0);
}

const hooksDirectory = path.join(gitDirectory, "hooks");
const preCommitPath = path.join(hooksDirectory, "pre-commit");

fs.mkdirSync(hooksDirectory, { recursive: true });
fs.writeFileSync(preCommitPath, preCommitHook);

if (process.platform !== "win32") {
    fs.chmodSync(preCommitPath, 0o755);
}

console.log("Installed pre-commit hook: npm run validate");