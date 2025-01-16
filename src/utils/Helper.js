const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getInitializedLetter = (string) => {
    return string.charAt(0).toUpperCase();
}

export { formatPrice, capitalizeFirstLetter, getInitializedLetter }