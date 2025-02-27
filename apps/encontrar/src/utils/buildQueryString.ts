export const buildQueryString = (params: URLSearchParams): string => {
  return new URLSearchParams(params as unknown as Record<string, string>).toString();
};
