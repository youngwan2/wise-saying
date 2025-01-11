export class HttpError extends Error {
    public statusCode: number;
    public message: string;
  
    constructor(statusCode: number, message?: string) {
      super(message || `HTTP Error: ${statusCode}`);
      this.statusCode = statusCode;
      this.message = message || HttpError.defaultMessage(statusCode);
  
      // Ensure the name property is set to the class name
      Object.setPrototypeOf(this, HttpError.prototype);
    }
  
    // Default messages for common HTTP status codes
    static defaultMessage(statusCode: number): string {
      const messages: Record<number, string> = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
      };
      return messages[statusCode] || "Unknown Error";
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message?: string) {
      super(404, message || "요청된 리소스를 찾을 수 없습니다.");
    }
  }
  
  export class UnauthorizedError extends HttpError {
    constructor(message?: string) {
      super(401, message || "요청된 인증이 실패하였습니다.");
    }
  }

  export class BadRequestError extends HttpError {
    constructor(message?: string) {
      super(400, message || "잘못된 형식의 요청입니다.");
    }
  }

  export class IntervalServerError extends HttpError {
    constructor(message?: string) {
      super(500, message || "서버 측 문제로 요청이 실패하였습니다.");
    }
  }
