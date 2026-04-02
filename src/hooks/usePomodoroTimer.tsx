import { useState, useEffect, useRef } from "react";
import { Platform, Vibration } from "react-native";
import { cancelScheduledNotification, scheduleTimerFinishedNotification } from "../services/timerNotifications";

type UsePomodoroTimerParams = {
    focusDurationMinutes: number;
    timerAlertsEnabled: boolean;
}

const TIMER_VIBRATION_PATTERN =
    Platform.OS === "ios"
        ? [0, 250, 250, 250, 250, 250]
        : [0, 400, 200, 400, 200, 400];

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getRemainingSeconds(endTimeMs: number) {
    return Math.max(0, Math.ceil((endTimeMs - Date.now()) / 1000));
}

export function usePomodoroTimer({
    focusDurationMinutes,
    timerAlertsEnabled
}: UsePomodoroTimerParams) {
    const [secondsRemaining, setSecondsRemaining] = useState(focusDurationMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [endTimeMs, setEndTimeMs] = useState<number | null >(null);

    const scheduledNotificationIdRef = useRef<string | null>(null);
    
    const formattedTime = formatTime(secondsRemaining);

    let phaseLabel = "Ready";

    if (secondsRemaining === 0) {
        phaseLabel = "Completed";
    } else if (isRunning) {
        phaseLabel = "Focusing";
    } else if (secondsRemaining < focusDurationMinutes * 60) {
        phaseLabel = "Paused"
    }

    async function clearScheduledNotification() {
        const currentId = scheduledNotificationIdRef.current;
        scheduledNotificationIdRef.current = null;

        if (!currentId) {
            return;
        }

        await cancelScheduledNotification(currentId);
    }

    function startTimer() {
        const startingSeconds = secondsRemaining === 0 ? focusDurationMinutes * 60 : secondsRemaining;
        const nextEndTimeMs = Date.now() + startingSeconds * 1000;

        setSecondsRemaining(startingSeconds);
        setEndTimeMs(nextEndTimeMs);
        setIsRunning(true);
    }

    function pauseTimer() {
        if (endTimeMs) {
            setSecondsRemaining(getRemainingSeconds(endTimeMs));
        }

        setEndTimeMs(null);
        setIsRunning(false);
    }

    function resetTimer() {
        setEndTimeMs(null);
        setIsRunning(false);
        setSecondsRemaining(focusDurationMinutes * 60);
    }

    useEffect(() => {
        if (!isRunning || !endTimeMs) {
            return;
        }

        const intervalId = setInterval(() => {
            const nextSeconds = getRemainingSeconds(endTimeMs);

            setSecondsRemaining(nextSeconds);

            if(nextSeconds === 0) {
                setIsRunning(false);
                setEndTimeMs(null);
                scheduledNotificationIdRef.current = null;

                Vibration.vibrate(TIMER_VIBRATION_PATTERN);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, endTimeMs, timerAlertsEnabled]);

    useEffect(() => {
        async function syncNotification() {
            await clearScheduledNotification();

            if (!isRunning || !endTimeMs || !timerAlertsEnabled) {
                return;
            }

            scheduledNotificationIdRef.current = await scheduleTimerFinishedNotification(new Date(endTimeMs));
        }

        void syncNotification();
    }, [isRunning, endTimeMs, timerAlertsEnabled]);

    useEffect(() => {
        setIsRunning(false);
        setEndTimeMs(null);
        setSecondsRemaining(focusDurationMinutes * 60);
        void clearScheduledNotification();
    }, [focusDurationMinutes]);

    return {
        formattedTime,
        isRunning,
        phaseLabel,
        startTimer,
        pauseTimer,
        resetTimer
    };
}
