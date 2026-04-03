import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { fetchRandomCatImage } from "../services/catAPI";

type UseCompletedCatImageParams = {
    enabled: boolean,
    completedCount: number;
}

export function useCompletedCatImage({
    enabled,
    completedCount
}: UseCompletedCatImageParams) {
    const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
    const [catError, setCatError] = useState<string | null>(null);
    const [isCatLoading, setIsCatLoading] = useState(false);

    function clearCatImage() {
        setCatImageUrl(null);
        setCatError(null);
    }

    useEffect(() => {
        if (!enabled) {
            clearCatImage();
            return;
        } else if (completedCount === 0) {
            return;
        }

        async function loadCatImageAfterCompletion() {
            clearCatImage();
            setIsCatLoading(true);

            const networkState = await NetInfo.fetch();
            const hasInternet = networkState.isConnected === true && networkState.isInternetReachable !== false;

            if (!hasInternet) {
                setCatError("No internet connection. Cat image could not be loaded.");
                setIsCatLoading(false);
                return;
            }

            try {
                const imageUrl = await fetchRandomCatImage();
                setCatImageUrl(imageUrl);
            } catch (error) {
                if (error instanceof Error) {
                    setCatError(error.message);
                } else {
                    setCatError("Something went wrong while fetching cat image.");
                }
            } finally {
                setIsCatLoading(false);
            }
        }

        void loadCatImageAfterCompletion();
    }, [enabled, completedCount]);

    return {
        catImageUrl,
        catError,
        isCatLoading,
        clearCatImage
    }
}