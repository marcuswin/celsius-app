export default {
  getMargins,
}

function getMargins(margin) {
  if (!margin) return getMargins('0 0 0 0');

  const margins = margin.split(' ');
  if (margins.length !== 4) return getMargins();

  return {
    marginTop: Number(margins[0]),
    marginRight: Number(margins[1]),
    marginBottom: Number(margins[2]),
    marginLeft: Number(margins[3]),
  }
}
