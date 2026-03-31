import { useState, useEffect } from "react";

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function usePomodoroTimer(focusDurationMinutes: number) {
    const [secondsRemaining, setSecondsRemaining] = useState(focusDurationMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    
    const formattedTime = formatTime(secondsRemaining);

    let phaseLabel = "Ready";

    if (secondsRemaining === 0) {
        phaseLabel = "Compleated";
    } else if (isRunning) {
        phaseLabel = "Focusing";
    } else if (secondsRemaining < focusDurationMinutes * 60) {
        phaseLabel = "Paused"
    }

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsRemaining(currentSeconds => {
                if (currentSeconds <= 1) {
                    setIsRunning(false);
                    return 0;
                }

                return currentSeconds - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    useEffect(() => {
        setIsRunning(false);
        setSecondsRemaining(focusDurationMinutes * 60);
    }, [focusDurationMinutes]);

    function toggleRunning() {
        setIsRunning(currentValue => !currentValue);
    }

    function resetTimer() {
        setIsRunning(false);
        setSecondsRemaining(focusDurationMinutes * 60);
    }

    return {
        secondsRemaining,
        formattedTime,
        isRunning,
        phaseLabel,
        toggleRunning,
        resetTimer
    };
}