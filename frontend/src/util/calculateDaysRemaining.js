export default function calculateDaysRemaining(endDate) {
    new Date(endDate);
    const today = new Date();
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    return daysRemaining
}