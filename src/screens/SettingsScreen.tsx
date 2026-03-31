import { StyleSheet, Text, Pressable, View, TextInput, Switch, Keyboard, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";

import { useSettings } from "../context/SettingsContext";
import { getColors } from "../theme/colors";

export function SettingsScreen() {
    const {
        focusDurationMinutes,
        themeMode,
        setFocusDurationMinutes,
        setThemeMode
    } = useSettings();

    const colors = getColors(themeMode);
    const [minutesInput, setMinutesInput] = useState(String(focusDurationMinutes));
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        setMinutesInput(String(focusDurationMinutes));
    }, [focusDurationMinutes]);

    function handleSaveDuration() {
        const parsedValue = Number(minutesInput);

        if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
            return;
        }

        setFocusDurationMinutes(parsedValue);
        setMinutesInput(String(parsedValue));
        inputRef.current?.blur()
        Keyboard.dismiss();
    }

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["left", "right", "bottom"]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Focus Duration</Text>
                    <Text style={[styles.sectionDescription, { color: colors.mutedText }]}>
                        Set the default Pomodoro length in minutes.
                    </Text>

                    <TextInput
                        ref={inputRef}
                        value={minutesInput}
                        onChangeText={setMinutesInput}
                        keyboardType="number-pad"
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.border,
                                color: colors.text
                            }
                        ]}
                    />

                    <Pressable
                        style={[styles.saveButton, { backgroundColor: colors.accent }]}
                        onPress={handleSaveDuration}
                    >
                        <Text style={[styles.saveButtonText, { color: colors.primaryButtonText }]}>
                            Save Duration
                        </Text>
                    </Pressable>
                </View>

                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.themeRow}>
                        <View style={styles.themeTextBlock}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dark Mode</Text>
                            <Text style={[styles.sectionDescription, { color: colors.mutedText }]}>
                                Toggle the app appearance.
                            </Text>
                        </View>

                        <Switch
                            value={themeMode === "dark"}
                            onValueChange={(isDark) => setThemeMode(isDark ? "dark" : "light")}
                            trackColor={{ false: "#CFC7BE", true: colors.accent }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },
    scrollContent: {
        paddingVertical: 40,
        paddingHorizontal: 24
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 24
    },
    sectionCard: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8
    },
    sectionDescription: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16
    },
    input: {
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 18,
        marginBottom: 16
    },
    saveButton: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center"
    },
    saveButtonText: {
        fontSize: 17,
        fontWeight: "600"
    },
    themeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    themeTextBlock: {
        flex: 1,
        paddingRight: 16
    }
});

