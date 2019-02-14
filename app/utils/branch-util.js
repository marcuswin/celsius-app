import { Constants } from "expo";
import Branch, { BranchEvent } from "react-native-branch";

import { BRANCH_LINKS } from "../config/constants/common";
import store from '../redux/store';
import logger from '../utils/logger-util';
import Sentry from "./sentry-util";
import * as actions from "../redux/actions";

export default {
  initBranch,
  createCelPayBUO,
  createIndividualLinkBUO,
  createTransactionDetailsBUO,
}

// Initialize & Subscribe to Branch
async function initBranch() {
  try {
    Branch.subscribe((deepLink) => {
      if (!deepLink || !deepLink["+clicked_branch_link"] || deepLink.error || !deepLink.params) return;
      store.dispatch(actions.registerBranchLink(deepLink));
    });
  } catch (error) {
    Sentry.captureException(error);
  }
}

async function createIndividualLinkBUO() {
  const { profile } = store.getState().user;

  const individualLinkBuo = await createBUO(
    `individual:${profile.id}`,
    {
      locallyIndex: true,
      title: 'Download the App Now to Earn Interest Like Me',
      contentImageUrl: 'https://image.ibb.co/jWfnh9/referall_image.png',
      contentDescription: 'Deposit coins & earn up to 5% interest annually on BTC, ETH, LTC and more.',
      contentMetadata: {
        customMetadata: {
          referrer_id: profile.id,
          link_type: BRANCH_LINKS.INDIVIDUAL_REFERRAL,
          from_name: `${profile.first_name} ${profile.last_name}`,
          from_profile_picture: profile.profile_picture,

          referrer_award_amount: 10,
          referrer_award_coin: 'CEL',
          referred_award_amount: 10,
          referred_award_coin: 'CEL',
          referred_award_trigger: 'passed-kyc',
        }
      }
    }
  );

  return individualLinkBuo;
}

async function createCelPayBUO(transfer) {
  const { profile } = store.getState().user;

  const celPayBUO = await createBUO(
    `transfer:${transfer.hash}`,
    {
      locallyIndex: true,
      title: `You received ${Number(transfer.amount).toFixed(5)} ${transfer.coin.toUpperCase()}`,
      contentImageUrl: 'https://image.ibb.co/kFkHnK/Celsius_Device_Mock_link.jpg',
      contentDescription: 'Click on the link to get your money!',
      contentMetadata: {
        customMetadata: {
          amount: transfer.amount,
          coin: transfer.coin,
          from_name: `${profile.first_name} ${profile.last_name}`,
          from_profile_picture: profile.profile_picture,
          transfer_hash: transfer.hash,
          link_type: BRANCH_LINKS.TRANSFER,
        }
      }
    }
  );

  return celPayBUO;
}

async function createTransactionDetailsBUO(transaction) {
  const sender = `${transaction.transfer_data.sender.first_name} ${transaction.transfer_data.sender.last_name}`
  const celPayBUO = await createBUO(
    `transfer:${transaction.transfer_data.hash}`,
    {
      locallyIndex: true,
      title: `You received ${Number(transaction.amount).toFixed(5)} ${transaction.coin.toUpperCase()}`,
      contentImageUrl: 'https://image.ibb.co/kFkHnK/Celsius_Device_Mock_link.jpg',
      contentDescription: 'Click on the link to get your money!',
      contentMetadata: {
        customMetadata: {
          amount: transaction.amount,
          coin: transaction.coin,
          from_name: sender,
          from_profile_picture: transaction.transfer_data.sender.profile_picture,
          transfer_hash: transaction.transfer_data.hash,
          link_type: BRANCH_LINKS.TRANSFER,
        }
      }
    }
  );

  return celPayBUO;
}

async function createBUO(canonicalIdentifier, properties) {
  if (Constants.appOwnership !== 'standalone') return;
  const { email } = store.getState().user.profile;

  try {
    const branchObject = await Branch.createBranchUniversalObject(canonicalIdentifier, properties);
    Branch.setIdentity(email);
    branchObject.logEvent(BranchEvent.ViewItem);

    const { url } = await branchObject.generateShortUrl();

    return {
      branchObject,
      url: `${url}/`,
    }
  } catch(err) {
    logger.logme({ err })
  }
}
