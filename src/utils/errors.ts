/**
 * Filtering warning from antd
 */
const originalConsoleError = console.error;

console.error = (...args: any[]) => {
  const [message] = args;
  const regex = /^Warning.*\[antd:/;

  const isAntdWarning =
    (typeof message === "string" && regex.test(message)) ||
    message.includes("Instance created by `useForm` is not connected");

  if (isAntdWarning) {
    return;
  }

  originalConsoleError(...args);
};
