import User from "../models/user";
import Stripe from "stripe";
import queryString from 'query-string'
import Hotel from "../models/hotel";


const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => { 

const user = await User.findById(req.user._id).exec();

console.log("USER ==>",user);

if(!user.stripe_account_id){
    const account = await stripe.accounts.create({type: 'express'});
    
    console.log("ACCOUNT ===>" ,account);
    
    user.stripe_account_id = account.id;
    user.save();

}

let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });
  // prefill any info such as email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
   //console.log("ACCOUNT LINK", accountLink);
   let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("LOGIN LINK", link);
  res.send(link);

};

export const getAccountStatus = async (req, res) => {
   console.log("GET ACCOUNT STATUS");
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
   console.log("USER ACCOUNT RETRIEVE", account);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: account
    }
  ).exec();
  console.log(updatedUser);
  res.json(updatedUser);
};

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    console.log("BALANCE ===>", balance);
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("STRIPE PAYOUT SETTING ERR ", err);
  }
};


export const stripeSessionId = async (req, res) => {
  // console.log("you hit stripe session id", req.body.hotelId);
  // 1 get hotel id from req.body
  const { hotelId } = req.body;
  // 2 find the hotel based on hotel id from db
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();
  // 3 20% charge as application fee
  const fee = (item.price * 20) / 100;
  // 4 create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5 purchasing item details, it will be shown to user on checkout
    line_items: [
      {
        name: item.title,
        amount: item.price * 100, // in cents
        currency: "eur",
        quantity: 1,
      },
    ],
    // 6 create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      application_fee_amount: fee * 100,
      // this seller can see his balance in our frontend dashboard
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // success and calcel urls
    success_url: process.env.STRIPE_SUCCESS_URL,
  cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  // 7 add this session object to user in the db
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  // 8 send session id as resposne to frontend
  res.send({
    sessionId: session.id,
  });
};



/*success_url: process.env.STRIPE_SUCCESS_URL,
  cancel_url: process.env.STRIPE_CANCEL_URL,*/
  
  