const formatDateReadble = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) return null;

    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
};
export default formatDateReadble