export function getHoursFromRuntime(runtime: number){
    return new Date(runtime * 1000).toISOString().substring(15, 16);
}