export const MINUTES = 60
export const HOUR = 3600
export const DAY = 24 * 3600


export const delays = [
    { name: "No Delay", value:  -5 * MINUTES },
    { name: "5 Minutes", value:  5 * MINUTES },
    { name: "10 Minutes", value:  10 * MINUTES },
    { name: "15 Minutes", value:  15 * MINUTES },
    { name: "30 Minutes", value:  30 * MINUTES },
    { name: "1 Hour", value:  HOUR },
    { name: "2 Hour", value: 2 * HOUR },
    { name: "4 Hour", value:  HOUR },
    { name: "8 Hour", value:  HOUR },
    { name: "12 Hour", value:  HOUR },
    { name: "1 Day", value:  DAY },
]

export const durationLists = [
    { name: "10 Minutes", value:  10 * MINUTES },
    { name: "1 Day", value:  DAY },
    { name: "2 Days", value: 2 * DAY },
    { name: "3 Days", value: 3 * DAY },
    { name: "1 Weeks", value: 7 * DAY },
    { name: "2 Weeks", value: 14 * DAY },
    { name: "30 Days", value: 30 * DAY },
    { name: "60 Days", value: 60 * DAY },
    { name: "90 Days", value: 90 * DAY },
]