export default {
  isERC20,
}

function isERC20(currency) {
  return ['eth', 'cel'].indexOf(currency) !== -1;
}
