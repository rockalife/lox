import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import { Scanner } from "./Scanner";
import { isLoxError } from "./LoxError";

export class Lox {
  static hadError = false;

  static main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      Lox.runPrompt();
    } else if (args.length === 1) {
      Lox.runFile(args[0]);
    } else {
      console.error("Lox called with incorrect arguments");
      process.exit(64);
    }
  }

  static runFile(filePath: string) {
    const fileContents = fs.readFileSync(
      path.isAbsolute(filePath)
        ? filePath
        : path.resolve(__dirname, `../${filePath}`),
      "utf8"
    );

    Lox.run(fileContents);

    if (Lox.hadError) {
      process.exit(65);
    }
  }

  static runPrompt() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (line) => {
      Lox.run(line.trim());

      rl.prompt();

      Lox.hadError = false;
    });
    rl.on("close", () => {
      process.stdout.write("\n");
    });

    rl.prompt();
  }

  private static run(source: string) {
    try {
      const scanner = new Scanner(source);
      const tokens = scanner.scanTokens();

      for (const token of tokens) {
        console.log(token);
      }
    } catch (e) {
      if (isLoxError(e)) {
        for (const { line, where = "", message } of e.errors) {
          Lox.report(line, where, message);
        }
      } else {
        throw e;
      }
    }
  }

  static error(line: number, message: string) {
    Lox.report(line, "", message);
  }

  private static report(line: number, where: string, message: string) {
    console.error(`[line ${line}] Error ${where}: ${message}`);
  }
}
