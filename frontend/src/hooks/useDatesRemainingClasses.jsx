import { useCallback, useEffect, useState } from "react"

export default function useDatesRemainingClasses(daysRemaining, progress) {
    const [days, setDays] = useState(daysRemaining)
    const [classNames, setClassNames] = useState("")

    const classesByDaysRemaining = useCallback((days, progress) => {
        if (progress === 100) { return "bg-green-500/20 text-green-300 border-green-500/30" }
        else if (days > 14) { return "bg-blue-500/20 text-blue-300 border-blue-500/30" }
        else if (days < 7) { return "bg-red-500/20 text-red-300 border-red-500/30" }
        else if (days < 14) { return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" }
    }, [])

    useEffect(() => {
        setDays(daysRemaining)
    }, [daysRemaining])

    useEffect(() => {
        setClassNames(classesByDaysRemaining(days, progress))
    }, [days, classesByDaysRemaining, progress])


    return { daysRemainingClasses: classNames }
}
