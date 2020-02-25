export class LoxError {
  message = "LoxError";
  errors: LoxErrorItem[];

  constructor(errors: LoxErrorItem[]) {
    this.errors = errors;
  }
}

export type LoxErrorItem = {
  line: number;
  message: string;
  where?: string;
};

export function isLoxError(e: unknown): e is LoxError {
  return (
    typeof e === "object" &&
    e !== null &&
    (e as LoxError).message === "LoxError" &&
    (e as LoxError).errors.every((e) => "line" in e && "message" in e)
  );
}
