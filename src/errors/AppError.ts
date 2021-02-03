export default class AppError extends Error {
  constructor(public errorCode: string, public statusCode: number) {
    super(errorCode)
  }
}
