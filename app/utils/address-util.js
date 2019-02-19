
function splitAddressTag(address) {
  let addressArray;
  const addressObj = {};

  if (address.indexOf("?dt=") !== -1 ) {
    addressArray = address.split("?dt=");
    addressObj.newAddress = addressArray[0];
    addressObj.newTag = addressArray[1];
  } else if (address.indexOf("?memoId=") !== -1 ) {
    addressArray = address.split("?memoId=");
    addressObj.newAddress = addressArray[0];
    addressObj.newTag = addressArray[1];
  } else {
    addressObj.newAddress = address;
    addressObj.newTag = ""
  }

  return addressObj;
}

function hasTag(address) {
  const tag = address.indexOf("?dt=") !== -1 || address.indexOf("?memoId=") !== -1;

  return tag
}

function joinAddressTag(coin, address, coinTag) {
  let newWithdrawalAddress;
  if (coin === "xrp" && coinTag) newWithdrawalAddress = address.concat("?dt=").concat(coinTag);
  if (coin === "xlm" && coinTag) newWithdrawalAddress = address.concat("?memoId=").concat(coinTag);
  if (!["xrp", "xlm"].includes(coin) || !coinTag) newWithdrawalAddress = address;

  return newWithdrawalAddress
}

export default {
  splitAddressTag,
  joinAddressTag,
  hasTag
}



