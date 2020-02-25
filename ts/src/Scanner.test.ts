import { Scanner } from "./Scanner";
import { Token } from "./Token";
import { LoxError } from "./LoxError";

describe("Testing 'scanTokens' method", () => {
  test("single character tokes", () => {
    const code = "( ) { } , . - + ; * /";
    const scanner = new Scanner(code);
    const tokens = scanner.scanTokens();
    const expected: Token[] = [
      {
        type: "LEFT_PAREN",
        lexeme: "(",
        literal: null,
        line: 1,
      },
      {
        type: "RIGHT_PAREN",
        lexeme: ")",
        literal: null,
        line: 1,
      },
      {
        type: "LEFT_BRACE",
        lexeme: "{",
        literal: null,
        line: 1,
      },
      {
        type: "RIGHT_BRACE",
        lexeme: "}",
        literal: null,
        line: 1,
      },
      {
        type: "COMMA",
        lexeme: ",",
        literal: null,
        line: 1,
      },
      {
        type: "DOT",
        lexeme: ".",
        literal: null,
        line: 1,
      },
      {
        type: "MINUS",
        lexeme: "-",
        literal: null,
        line: 1,
      },
      {
        type: "PLUS",
        lexeme: "+",
        literal: null,
        line: 1,
      },
      {
        type: "SEMICOLON",
        lexeme: ";",
        literal: null,
        line: 1,
      },
      {
        type: "STAR",
        lexeme: "*",
        literal: null,
        line: 1,
      },
      {
        type: "SLASH",
        lexeme: "/",
        literal: null,
        line: 1,
      },
      {
        type: "EOF",
        lexeme: "",
        literal: null,
        line: 1,
      },
    ];

    expect(tokens).toEqual(expected);
  });

  test("single or double character tokes", () => {
    const code = "! != = == < <= > >=";
    const scanner = new Scanner(code);
    const tokens = scanner.scanTokens();
    const expected: Token[] = [
      {
        type: "BANG",
        lexeme: "!",
        literal: null,
        line: 1,
      },
      {
        type: "BANG_EQUAL",
        lexeme: "!=",
        literal: null,
        line: 1,
      },
      {
        type: "EQUAL",
        lexeme: "=",
        literal: null,
        line: 1,
      },
      {
        type: "EQUAL_EQUAL",
        lexeme: "==",
        literal: null,
        line: 1,
      },
      {
        type: "LESS",
        lexeme: "<",
        literal: null,
        line: 1,
      },
      {
        type: "LESS_EQUAL",
        lexeme: "<=",
        literal: null,
        line: 1,
      },
      {
        type: "GREATER",
        lexeme: ">",
        literal: null,
        line: 1,
      },
      {
        type: "GREATER_EQUAL",
        lexeme: ">=",
        literal: null,
        line: 1,
      },
      {
        type: "EOF",
        lexeme: "",
        literal: null,
        line: 1,
      },
    ];

    expect(tokens).toEqual(expected);
  });

  test("whitespace", () => {
    const code = "\r \t \n // ignore comment";
    const scanner = new Scanner(code);
    const tokens = scanner.scanTokens();
    const expected: Token[] = [
      {
        type: "EOF",
        lexeme: "",
        literal: null,
        line: 2, // because of \n
      },
    ];

    expect(tokens).toEqual(expected);
  });

  test("literals", () => {
    const code = '"abc" 1 1.1';
    const scanner = new Scanner(code);
    const tokens = scanner.scanTokens();
    const expected: Token[] = [
      {
        type: "STRING",
        lexeme: '"abc"',
        literal: "abc",
        line: 1,
      },
      {
        type: "NUMBER",
        lexeme: "1",
        literal: 1,
        line: 1,
      },
      {
        type: "NUMBER",
        lexeme: "1.1",
        literal: 1.1,
        line: 1,
      },
      {
        type: "EOF",
        lexeme: "",
        literal: null,
        line: 1,
      },
    ];

    expect(tokens).toEqual(expected);
  });

  test("identifiers", () => {
    const code = `
and class else false for fun if nil or print return super this true var while
somebody once told me
`;
    const scanner = new Scanner(code);
    const tokens = scanner.scanTokens();
    const expected: Token[] = [
      {
        type: "AND",
        lexeme: "and",
        literal: null,
        line: 2,
      },
      {
        type: "CLASS",
        lexeme: "class",
        literal: null,
        line: 2,
      },
      {
        type: "ELSE",
        lexeme: "else",
        literal: null,
        line: 2,
      },
      {
        type: "FALSE",
        lexeme: "false",
        literal: null,
        line: 2,
      },
      {
        type: "FOR",
        lexeme: "for",
        literal: null,
        line: 2,
      },
      {
        type: "FUN",
        lexeme: "fun",
        literal: null,
        line: 2,
      },
      {
        type: "IF",
        lexeme: "if",
        literal: null,
        line: 2,
      },
      {
        type: "NIL",
        lexeme: "nil",
        literal: null,
        line: 2,
      },
      {
        type: "OR",
        lexeme: "or",
        literal: null,
        line: 2,
      },
      {
        type: "PRINT",
        lexeme: "print",
        literal: null,
        line: 2,
      },
      {
        type: "RETURN",
        lexeme: "return",
        literal: null,
        line: 2,
      },
      {
        type: "SUPER",
        lexeme: "super",
        literal: null,
        line: 2,
      },
      {
        type: "THIS",
        lexeme: "this",
        literal: null,
        line: 2,
      },
      {
        type: "TRUE",
        lexeme: "true",
        literal: null,
        line: 2,
      },
      {
        type: "VAR",
        lexeme: "var",
        literal: null,
        line: 2,
      },
      {
        type: "WHILE",
        lexeme: "while",
        literal: null,
        line: 2,
      },
      {
        type: "IDENTIFIER",
        lexeme: "somebody",
        literal: null,
        line: 3,
      },
      {
        type: "IDENTIFIER",
        lexeme: "once",
        literal: null,
        line: 3,
      },
      {
        type: "IDENTIFIER",
        lexeme: "told",
        literal: null,
        line: 3,
      },
      {
        type: "IDENTIFIER",
        lexeme: "me",
        literal: null,
        line: 3,
      },
      {
        type: "EOF",
        lexeme: "",
        literal: null,
        line: 4,
      },
    ];

    expect(tokens).toEqual(expected);
  });

  test("errors", () => {
    let error: LoxError;

    try {
      const code = '#$?"';
      const scanner = new Scanner(code);
      scanner.scanTokens();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(LoxError);
    expect(error.errors).toEqual([
      { line: 1, message: "Unexpected character: #" },
      { line: 1, message: "Unexpected character: $" },
      { line: 1, message: "Unexpected character: ?" },
      { line: 1, message: "Unterminated string" },
    ]);
  });
});
