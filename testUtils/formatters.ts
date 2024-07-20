export const formatTrpcBodyToData = (data: unknown) => (data as Record<"json", {}>).json;
