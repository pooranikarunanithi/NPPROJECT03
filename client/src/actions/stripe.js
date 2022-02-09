import axios from "axios";


export const createConnectAccount = async (token) =>
  await axios.post(
    `api/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const getAccountStatus = async (token) =>
  axios.post(
    `api/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  export const getAccountBalance = async (token) =>
  axios.post(
    `api/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const currencyFormatter = (data) => {
    return (data.amount ).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  };

  export const payoutSetting = async (token) =>
  await axios.post(
    `api/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  export const getSessionId = async (token, hotelId) =>
  await axios.post(
    `api/stripe-session-id`,
    {
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
