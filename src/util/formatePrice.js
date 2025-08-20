const formatPrice = (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') return '';

    const numeric = Number(value);
    if (isNaN(numeric)) return '';

    return numeric.toLocaleString('en-US');
};
export default formatPrice