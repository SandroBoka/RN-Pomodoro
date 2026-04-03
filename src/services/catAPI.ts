type CatAPIImage = {
    id: string
    url: string
    width: number
    height: number
};

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=1"

function getCatApiKey() {
    const apiKey = process.env.EXPO_PUBLIC_CAT_API_KEY;

    if (!apiKey) {
        throw new Error("Missing EXPO_PUBLIC_CAT_API_KEY. Assure it is added in .env.local");
    }

    return apiKey;
}

export async function fetchRandomCatImage(): Promise<string> {
    const response = await fetch(CAT_API_URL, {
        method: "GET",
        headers: { "x-api-key": getCatApiKey() }
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data: CatAPIImage[] = await response.json();
    const imageUrl = data[0]?.url;

    if (!imageUrl) {
        throw new Error("The API did not return an image URL.");
    }

    return imageUrl;
}