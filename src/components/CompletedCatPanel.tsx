import { Image, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../theme/colors";

type CompletedCatPanelProps = {
    isVisible: boolean;
    isLoading: boolean;
    error: string | null;
    imageUrl: string | null;
    colors: AppColors;
};

export function CompletedCanPanel({
    isVisible,
    isLoading,
    error,
    imageUrl,
    colors
}: CompletedCatPanelProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <View style={styles.catSection}>
            {isLoading ? (
                <Text style={[styles.statusText, { color: colors.secondaryButtonText }]}>
                    Loading cat...
                </Text>
            ) : null}

            {error ? (
                <Text style={[styles.errorText, { color: colors.accent }]}>
                    {error}
                </Text>
            ) : null}

            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.catImage} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    catSection: {
        width: "100%",
        alignItems: "center",
        marginTop: 24
    },
    statusText: {
        fontSize: 18,
        fontWeight: "600"
    },
    errorText: {
        marginTop: 12,
        fontSize: 16,
        textAlign: "center"
    },
    catImage: {
        width: 260,
        height: 260,
        borderRadius: 18,
        marginTop: 16
    }
});