const displayDHCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: 'MAD',
        minimumFractionDigits: 2,
    });
    return formatter.format(num).replace('MAD', '').trim() + ' MAD';
}

export default displayDHCurrency;
