export interface ResponseEntity<T> {
    isSuccess: boolean;
    statusCode: number;
    message: string;
    stackTrace: string;
    errorMessages: string[] | null;
    result: T | null;
}
