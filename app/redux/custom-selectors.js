import { createSelector } from 'reselect/lib/index';


const getDepositCoins = (state) => state.user.compliance.deposit.coins;
const getCoinRates = (state) => state.currencies.rates;

export const getDepositEligibleCoins = createSelector(getDepositCoins, getCoinRates, (depositCoins, rates) => {
  const complianceDepositCoins = depositCoins;
  let eligibleCoins = [];

  if (rates) {
    eligibleCoins = rates.filter((coin) => {
      const filteredCoin = complianceDepositCoins.filter((complianceCoin) => (coin.short === complianceCoin));
      return filteredCoin && filteredCoin.length;
    });
  }

  return [
    ...eligibleCoins
  ]
});

const getSearchFormData = (state) => state.forms.formData.search;
const getContacts = () => [
  {
    "id": "44554255-a3d1-47c7-b3d7-0d1bbc1e1a77",
    "name": "Nevena Milosavljevic",
    "email": "milosavljevicnevena@yahoo.com",
    "phone_number": null,
    "profile_image": "http://api.staging.celsius.network/files/df/5e/21qwyemhcjn1qdf5e.jpeg",
    "network": "Phone"
  },
  {
    "id": "16429069-52aa-4db6-9b81-49467bc4ac4b",
    "name": "Ivor Jugo",
    "email": null,
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Phone"
  },
  {
    "id": "164229069-52daa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Phone"
  },
  {
    "id": "164229069-52faga-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Facebook"
  },
  {
    "id": "16422906a9-52aa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Phone"
  },
  {
    "id": "164229069-j52aa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Phone"
  },
  {
    "id": "16422h9069-52aa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Facebook"
  },
  {
    "id": "1642a29069-52aa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Twitter"
  },
  {
    "id": "16422906f9-52aa-4db6-9b81-49467bc4ac4b",
    "name": "AS",
    "email": "www@www.com",
    "phone_number": "+381643550932",
    "profile_image": null,
    "network": "Twitter"
  },
];

export const getFilteredContacts = createSelector(getSearchFormData, getContacts, (searchTerm, contacts) => {
  if (searchTerm) {
    return contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return contacts

});
