import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export const TIMER_CHANNEL_ID = "timer-finished";

export function configureNotifications() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

export async function requestNotificationPermission() {
    const exsitingPermission = await Notifications.getPermissionsAsync();

    if (exsitingPermission.granted) {
        return true;
    }

    const updatedPermission = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: false,
            allowSound: true,
        }
    });

    return updatedPermission.granted;
}

export async function scheduleTimerFinishedNotification(date: Date) {
    return Notifications.scheduleNotificationAsync({
        content: {
            title: "Pomodoro Timer Finished",
            body: "Your focus session is complete.",
            sound: "default",
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
    });
}

export async function cancelScheduledNotification(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
}