import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getColors } from "../theme/colors";

import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useSettings } from "../context/SettingsContext";

export function PomodoroScreen() {
    const { focusDurationMinutes, themeMode } = useSettings();
    const { formattedTime, isRunning, phaseLabel, toggleRunning, resetTimer } = usePomodoroTimer(focusDurationMinutes);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const colors = getColors(themeMode);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.topBar}>
                <Pressable style={styles.iconButton} onPress={() => navigation.navigate("Settings")}>
                    <Ionicons name="settings-outline" size={24} color={colors.icon} />
                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>Pomodoro Timer</Text>

                <View
                    style={[
                        styles.timerCard,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border
                        }
                    ]}
                >
                    <Text style={[styles.phaseLabel, { color: colors.mutedText }]}> {phaseLabel} </Text>
                    <Text style={[styles.time, { color: colors.accent }]}>{formattedTime}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <Pressable
                        style={[styles.primaryButton, { backgroundColor: colors.accent }]}
                        onPress={toggleRunning}
                    >
                        <Text style={[styles.primaryButtonText, { color: colors.primaryButtonText }]}>
                            {isRunning ? "Pause" : "Start"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.secondaryButton, { backgroundColor: colors.secondarySurface }]}
                        onPress={resetTimer}
                    >
                        <Text style={[styles.secondaryButtonText, { color: colors.secondaryButtonText }]}>
                            Reset
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    content: {
        flex: 1,
        alignItems: "center",
        marginTop: 32
    },
    title: {
        fontSize: 32,
        fontWeight: "700"
    },
    timerCard: {
        width: "100%",
        borderRadius: 24,
        borderWidth: 1,
        paddingVertical: 40,
        paddingHorizontal: 24,
        alignItems: "center",
        marginTop: 32
    },
    phaseLabel: {
        fontSize: 28,
        fontWeight: "500",
        marginBottom: 20
    },
    time: {
        fontSize: 64,
        fontWeight: "800",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24
    },
    primaryButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: "600"
    },
    secondaryButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14
    },
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: "600"
    },
    topBar: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24
    },
    iconButton: {
        padding: 8
    }
});