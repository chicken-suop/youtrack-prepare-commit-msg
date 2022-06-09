const verbose = process.argv.find((arg) => arg === '--verbose');

export function debug(message: string): void {
  if (!verbose) {
    return;
  }

  console.log(`YOUTRACK prepare commit msg > DEBUG: ${message}`);
}

export function log(message: string): void {
  console.log(`YOUTRACK prepare commit msg > ${message}`);
}

export function error(err: string): void {
  console.error(`YOUTRACK prepare commit msg > ${err}`);
}
