export default function calculateDaysRemaining(endDate) {
    const end = new Date(endDate);
    const today = new Date();
    const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    return daysRemaining
}