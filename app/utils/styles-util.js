export default {
  getMargins,
  getPadding,
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

function getPadding(padding) {
  if (!padding) return getPadding('0 0 0 0');

  const paddings = padding.split(' ');
  if (paddings.length !== 4) return getPadding();

  return {
    paddingTop: Number(paddings[0]),
    paddingRight: Number(paddings[1]),
    paddingBottom: Number(paddings[2]),
    paddingLeft: Number(paddings[3]),
  }
}
