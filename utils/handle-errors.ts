export function handleError(message: string): string {
  let errorMessage = 'Something went wrong';

  if (message.includes('abort')) {
    errorMessage = '';
  } else if (message.includes('Failed to fetch')) {
    errorMessage = `Can't connect to server, check internet connection`;
  } else {
    errorMessage = message;
  }

  return errorMessage;
}
