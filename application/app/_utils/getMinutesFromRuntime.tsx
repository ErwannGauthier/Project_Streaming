export function getMinutesFromRuntime(runtime: number) {
    return new Date(runtime * 1000).toISOString().substring(17, 19);
}