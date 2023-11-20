export function formatMoney(value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
}

export function slicePercentage(num) {
  if (num) {
    if (num > 0) {
      return `${num.toString().slice(0, 4)}%`;
    } else {
      return `${num.toString().slice(1, 5)}%`;
    }
  }
}

export function cardPercentage(num) {
  if (num) {
    if (num > 0) {
      return `+${num.toString().slice(0, 4).replace(".", ",")}%`;
    } else {
      return `${num.toString().slice(0, 5).replace(".", ",")}%`;
    }
  }
}