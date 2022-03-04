import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
// import { timers } from "jquery";
class Link extends Component {

  constructor() {
    super();
    this.state = {
      linkToken: ""
    };
  }
  componentDidMount = async () => {
      console.log('it worked!!!!!!!')
    var response = await axios.post("/create_link_token");
    console.log("link token", response);
    this.setState({ linkToken: response.data["link_token"] });
  };
  handleOnSuccess = async (public_token, metadata) => {
    console.log('handleon success worked!!!!!!!')
    // send token to client server
    var data = {
      public_token: public_token
    };
    var response = await axios.post("/exchange_public_token", data);
    console.log(response);
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    sessionStorage.setItem("accessToken", response.data["access_token"]);
    this.getAccounts();
    console.log('all account details .....................')
    setTimeout(()=>this.props.onChange(),20000);
  };

  async getAccounts() {
    var access_token = sessionStorage.getItem("accessToken");
    var data = {
      access_token: access_token
    };
    var response = await axios.post("/get_accounts", data);
    this.getAccountId();
    //console.log(response);
  };

  async getAccountId() {
    var access_token = sessionStorage.getItem("accessToken");
    var data = {
      access_token: access_token,
      account_id: "tempdata",
    };
    var response = await axios.post("/get_banktoken", data);
    console.log('bank account token----------------')
    console.log('bank account token is generated **************'+JSON.stringify(response));

  }
  render() {
    //console.log("window.x"+window.x)
    const { linkToken } = this.state;
    return (
      <div>
        {linkToken.toString !== "undefined" ? (
          <PlaidLink
            token={linkToken.toString()}
            env="sandbox"
            onSuccess={this.handleOnSuccess}
            onExit={this.handleOnExit}
          >
           Add new ACH
          </PlaidLink>
          
        ) : null}
      </div>
    );
  }
}
export default Link;
