import {apiKey} from "@/app/_utils/localVariables";

export async function callAPI(url: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `'Bearer ${apiKey}`
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data
}