import fetch from 'node-fetch';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config();
const { response } = require('express');
const express = require("express");
const { win32 } = require('path');
const plaid = require("plaid");
const util = require('util');
const { log } = require('util');
const app = express();
const PORT = 4090;

// Initialize the Plaid client
// const client = new plaid.Client({
//   clientID: process.env.REACT_APP_PLAID_CLIENT_ID,
//   secret: process.env.REACT_APP_PLAID_SECRET,
//   env: plaid.environments.sandbox,
// });

const configuration = new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.REACT_APP_PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.REACT_APP_PLAID_SECRET,
      },
    },
  });
  
const client = new plaid.PlaidApi(configuration);

console.log(client)

app.use(express.json());

//get account balances
app.post('/accounts_balance', async (req, res) => {
  try{
    const response = await client.getBalance(req.body.access_token).catch((err) => {
      // handle error
      console.log(err);
    });
    //const accounts = response.accounts;
    res.json({
      accounts: response.accounts
    });
  }
  catch(e){
    console.log(e)
  }
 
});


//endpoint exchanges public token for an access token currently working on this part
app.post('/exchange_public_token', async (request, res, next) => {
  try{
  //public token cant be found
    const response = await client
    .itemPublicTokenExchange(request.body)
    .catch((err) => {
      console.log(err)
    });
  const access_token = response.data.access_token;
  const itemId = response.item_id;
  // ACCESS_TOKEN = response.access_token;
  // ITEM_ID = response.item_id;
  res.json({
    access_token: access_token,
    item_id: itemId
  });
  console.log("access token below");
  console.log(access_token);
  }
  catch(e){
    console.log(e)
  }
 
});

//endpoint returns link_token 
app.post('/create_link_token', async (request, response, next) => {
  try{
    // 1. Grab the client_user_id by searching for the current user in your database
    const user = "testUser"
    const clientUserId = "123";
    // 2. Create a link_token for the given user
    const linkTokenResponse = await client.linkTokenCreate({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'InteractPay',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    const link_token = linkTokenResponse.data.link_token;
    // 3. Send the data to the client
    response.json({ link_token });
    console.log(linkTokenResponse.data.link_token);
  }
  catch(e){
    console.log(e)
  }
 
});


// app.post('/get_accounts', async(request, response, next)=> {
//   try{
//     const accounts = await client.accountsGet(request.body) .catch((err) => {
//       console.log(err)
//     });
//     console.log("---------accounts---------")
//     console.log(accounts.data);
//     response.json(accounts.data);
    
//   }
//   catch(e){
//     console.log(e);
//   }
// })

app.post('/get_accounts', async(request, response, next)=> {
  console.log("------/get_accounts-------");
  const data = {
    access_token: request.body.access_token,
  };
  try {
    const result = await client.accountsGet(data);
    const accounts = result.data.accounts;
    console.log("-------accounts-------");
    console.log(accounts);
    response.json(accounts);
  } catch (error) {
    // handle error
    console.log(error);
  }
});


app.post('/get_banktoken', async (req, res) => {

  var { access_token, account_id } = req.body

  try 
  {
    const authResponse = await client.authGet({access_token});
    console.log("-------authResponse-------");
    console.log(authResponse);
    account_id = authResponse.data.accounts[0].account_id; //First account in the given bank. In implementation give user choice
    console.log("------account_id------");
    console.log(account_id);
    console.log('---------------');

    // const identityResponse = await client.getIdentity(access_token);

    // console.log('Identity response:');
    // console.log(util.inspect(identityResponse, false, null, true));
    // console.log('---------------');

    // const balanceResponse = await client.accountsBalanceGet({access_token});
    // console.log('Balance response');
    // console.log(util.inspect(balanceResponse, false, null, true));
    // console.log('---------------');

    var bankAccountToken;

      var bankTokenResponse = await client.processorStripeBankAccountTokenCreate({access_token, account_id});
      //this.btoken=bankTokenResponse;

      bankAccountToken = bankTokenResponse.data.stripe_bank_account_token;

      console.log('------bankAccountToken-----');
      console.log(bankAccountToken);
      console.log('---------------');
     // this.sample();
    //https://api.stripe.com/v1/customers/cus_LByBwesXN55tbh/sources?source=btok_1KY1WhJZdmpiz6ZwBfFm8AcQ
    //invoke stripe api to create source data
    const response = await fetch(
      "https://api.stripe.com/v1/customers/cus_LCimCtUYQ8o7iW/sources?source=" +
      bankAccountToken,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization:
            "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
        },
      }
    );
      const data = await response.json();
      console.log('This is source response'+JSON.stringify(data))

      var bankid = data.id;

  //invoke stripe api to Create Payment Intent(Transaction)
  //https://api.stripe.com/v1/charges?amount=18888&currency=usd&customer=cus_LByBwesXN55tbh&source=ba_1KVZmxJZdmpiz6ZwOLPpuYyi
  // const response2 = await fetch(
  //   "https://api.stripe.com/v1/charges?amount=50000&currency=usd&customer=cus_LCimCtUYQ8o7iW&source=" +
  //   bankid,
  //   {
  //     method: "POST",
  //     headers: {
  //       "x-rapidapi-host": "https://api.stripe.com",
  //       Authorization:
  //         "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
  //     },
  //   }
  // );
  //   const data2 = await response2.json();
  //   console.log('----------------This is Create Payment Intent response------------------------')
  //   console.log(JSON.stringify(data2))

//
// list ach payment in UI
// const response3 = await fetch(
//   "https://api.stripe.com/v1/customers/cus_LCimCtUYQ8o7iW/sources" ,
//   {
//     method: "POST",
//     headers: {
//       "x-rapidapi-host": "https://api.stripe.com",
//       Authorization:
//         "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
//     },
//   }
// );
//   const data3 = await response3.json();
//   console.log('list ach payment'+JSON.stringify(data3))
     
//   res.sendStatus(200);
     
  
   }
 
 catch (e){
    console.log("-------authResponseError-------");
    console.log(e);
    res.sendStatus(400);
 } 
 
  

 


});




app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});