import logo from "./logo.svg";
//import React, { Component} from 'react';
//import { useState } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-dropdown";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import React, { Component, PropTypes, useState } from "react";
import PaymentMethodList from "./components/PaymentMethodList";
import ListPaymentMethods from "./components/ListPaymentMethods";
import Link from './components/Link';
import axios from 'axios';


var Modal = require("react-bootstrap-modal");
var achpaymentMethodId;

//const defaultOption = options[0];
//import AddNewCard from './components/AddNewCard';

toast.configure();
class App extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    this.customerId = queryParams.get("customerId");
    //const useDropdownMenu =   useDropdownMenu('2');
    //   if(isContactExist == "true"){
    //     console.log("inside if for contact check");
    //   // this.state = {
    //   //   isnewContact: false,
    //   // };
    // }
    // else{
    //   console.log("inside else for contact check");
    //   this.state = {
    //     isnewContact: true,
    //   };
    //   console.log("inside else for contact check"+this.state.isnewContact);
    //}
    this.testPrint = this.testPrint.bind(this);
    this.handleIsAch = this.handleIsAch.bind(this);
    this.handleIsAchFalse = this.handleIsAchFalse.bind(this);
    this.createContact = this.createContact.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.onloadAchFetch = this.onloadAchFetch.bind(this);
    this.createStripeTransaction = this.createStripeTransaction.bind(this);
    this.notification = this.notification.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.createTransactionRecord = this.createTransactionRecord.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCardInput = this.handleCardInput.bind(this);
    this.createPaymentMethod = this.createPaymentMethod.bind(this);
    this.opendropdown = this.opendropdown.bind(this);
    this.selectedAchPaymentMethod=this.selectedAchPaymentMethod.bind(this);
    this.handleChechBox = this.handleChechBox.bind(this);
    this.defaultCardPayment = this.defaultCardPayment.bind(this);
    this.updateContact = this.updateContact.bind(this);
    //this.getContactDetails = this.getContactDetails.bind(this);
    
    //this.onloadeddata = this.onloadeddata.bind(this);
    console.log("constructor");
    const current = new Date();
    this.todaysDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    console.log("todaysDate--> " + this.todaysDate);
    this.state = {isnewcard: false};
    this.state = { dropdown: false };
    this.state = { newcontact: false };
    this.state = { isClick: false };
    this.state = {isAch : false}
    this.state = {isSave : false}
    this.state = {isSaveCard: false}
    //this.state = {isCheckValue: false}
    this.handleClick = this.handleClick.bind(this);
    // this.state = {
    //   isnewContact: false,
    // };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.contactFlag = 0;
    this.state = {
      achItems: []
  };
    
  }
  componentDidMount() {
    console.log("Hiiiiii")
    this.onloadAchFetch();
    this.isCheckValue = false;
    //this.getContactDetails();
   
    
    } 

  
 //---------------------------------------------------------------------------------------------------------------------------

    onloadAchFetch(){
   // //ach payments
   
     //list ach payment in UI
     console.log('invoked onloadfetchAch()!!!!')
    fetch(
     "https://api.stripe.com/v1/customers/cus_LCimCtUYQ8o7iW/sources" ,
     {
       method: "GET",
       headers: {
         "x-rapidapi-host": "https://api.stripe.com",
         Authorization:
           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
       },
     }
   ) 
   .then((response) => response.json())
             .then((response) => {
               //console.log("ListPaymentMethods--->" +JSON.stringify(response));
               var achList = response.data;
               this.outAch = achList;
               console.log('ach list--------------'+JSON.stringify(achList))
               this.setState({
                achItems: this.outAch
            });
             })
           
             .catch((err) => {
               console.log(err);
             });
  this.forceUpdate();    
  }
   //-------------------------------------------------------------------------------------------------------------------------
   //achpaymentId 
   selectedAchPaymentMethod(event) {
    console.log('invoked selectedAchPaymentMethod =====>');
    console.log("Invoked Method" + event.target.getAttribute("data-id"));
     achpaymentMethodId = event.target.getAttribute("data-id");
    this.x = achpaymentMethodId;
    var acc = document.querySelectorAll(".list-group-item");
     for (let i = 0; i < acc.length; i++) {
       if (acc[i].classList.contains("activeList")) {
          acc[i].classList.remove("activeList");
         }
       }
       let _listItems = event.target;
        _listItems.classList.add("activeList");
       
}
   opendropdown() {
    console.log("invoke dropdown");
    if(this.state.dropdown== false){
      console.log("invoke dropdown if false");
     this.setState({ dropdown: true });
    }else{
      this.setState({ dropdown: false });
      console.log("invoke dropdown if true");

    }
    
  }
  handleClick() {
    this.setState({ open: true });
  }
  handleInputChange(event) {
    console.log("Invoked create handleInputChange");
    this.inputParams = {};
    const target = event.target;
    if (target.name == "fname") {
      this.fname = target.value;
    }
    if (target.name == "lname") {
      this.lname = target.value;
    }
    if (target.name == "email") {
      this.email = target.value;
    }
    if (target.name == "phone") {
      this.phone = target.value;
    }
    if (target.name == "street") {
      this.street = target.value;
    }
    if (target.name == "city") {
      this.city = target.value;
    }
    if (target.name == "state") {
      this.State = target.value;
    }
    if (target.name == "zip") {
      this.zip = target.value;
    }
    if (target.name == "country") {
      this.country = target.value;
    }
    if(this.lname && this.email && this.phone){
      this.setState({
        isSave : true
      })
    }
    else{
      this.setState({
        isSave : false
      })

    }
    this.inputParams.salutation = "Mr";
    this.inputParams.firstName = this.fname;
    this.inputParams.lastName = this.lname;
    this.inputParams.contactEMail = this.email;
    this.inputParams.mobilePhone = this.phone;
    this.inputParams.mailStreet = this.street;
    this.inputParams.mailCity = this.city;
    this.inputParams.mailState = this.State;
    this.inputParams.mailZip = this.zip;
    this.inputParams.mailCountry = this.country;
    console.log("this.urlParam--->" + JSON.stringify(this.inputParams));
  }
  handleAddCard() {
    console.log("invoked handleAddCard ------>");
    this.setState({
      isnewcard: true,
      dropdown: false
    });
  }
  handleIsDelete() {
    console.log("handleDelete isInvoked ------>");
    this.setState({
      isDelete: true,
    });
    //window.paymentMethodId = event.target.getAttribute("data-id");
    console.log("handleDelete paymentid ------>" + window.paymentMethodId);
  }
  createContact() {
    console.log("Invoked create contact");
    this.name = this.fname + " " + this.lname;
    fetch(
      "https://api.stripe.com/v1/customers?name=" +
        this.name +
        "&email=" +
        this.email,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization:
            "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.customerId = response.id;
        window.custId = this.customerId;
        console.log("customer create -->" + response.id);
        if (this.customerId) {
          this.inputParams.customerId = this.customerId;
          var url =
            "https://crma-pay-developer-edition.na163.force.com/InteractPay/services/apexrest/crma_pay/InteractPayAuthorization/?methodType=POST&inputParams=" +
            JSON.stringify(this.inputParams);
          console.log("this.final url --->" + url);
          fetch(url, {
            method: "GET",
            headers: {
              mode: "cors",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              this.contactId = response;
              window.contId = this.contactId;
              console.log(" create  contact-->" + JSON.stringify(response));
              this.closeModal();
            })
            .catch((err) => {
              console.log("err" + err);
            });
          console.log("Invoke create Contact in salesforce");
        }
        // window.newContact = false;
        // console.log("Invoke window.newContact" + window.newContact);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  testPrint(){
    console.log('tested!!!!!!!!!!')
  }
   //handle ach flag =true here.....................
   handleIsAch() {
    console.log("invoked handleIsDelete ");
     this.setState({
        isAch : true
      })
 }
 //handle checkbox of default card
 handleChechBox()
  {
   
      if(this.isCheckValue == false){
      // this.setState({
      this.isCheckValue = true
    // })
  }
  else{
    // this.setState({
      this.isCheckValue = false
    // })
  }

    // console.log("isCheckValue----------",this.state.isCheckValue)
    console.log("isCheckValue----------",this.isCheckValue)

  }


 //handle ach flag =False here.....................
 handleIsAchFalse() {
  console.log("invoked handleIsDelete ");
   this.setState({
      isAch : false
    })
}

// '----------------This is Create Payment Intent-------------------------------------------
  createStripeTransaction() {
    console.log("Invoked createTransaction");
    const queryParams = new URLSearchParams(window.location.search);
    this.amount = queryParams.get("amount");
    var conAmount = this.amount + "00";
    this.custId = queryParams.get("customerId");
    var transactionUrl;
    if(this.custId){
      this.customerId = this.custId;
    }
    else{
      this.customerId = window.custId;
    }
    this.contactId = queryParams.get("contactId");
    this.paymentMethodId = window.paymentMethodId;
    //if ach payment id exists, then call the stripe api for ach payment
    if(achpaymentMethodId){
       transactionUrl =
      "https://api.stripe.com/v1/charges?amount=999&currency=usd&customer=cus_LCimCtUYQ8o7iW&source="
      +achpaymentMethodId;
    console.log("transactionUrl-->" + transactionUrl);
    
  }if( this.paymentMethodId){
    transactionUrl =
      "https://api.stripe.com/v1/payment_intents" +
      "?amount=" +
      conAmount +
      "&currency=usd&customer=" +
      this.customerId +
      "&payment_method=" +
      this.paymentMethodId +
      "&confirm=true";
    console.log("transactionUrl-->" + transactionUrl);

  }  
    fetch(transactionUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        "content-type": "application/json",
        accept: "application/json",
        Authorization:
          "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("transactionresponse" + JSON.stringify(response));
        if (response.id) {
          this.transactionId = response.id;
          this.transactionstatus = response.status;
          this.gatewayMessage = JSON.parse(
            JSON.stringify(response.charges.data[0].outcome.seller_message)
          );
          this.gatewayStatus = JSON.parse(
            JSON.stringify(response.charges.data[0].outcome.network_status)
          );
          var message = "Your payment is successfully completed";
          var type = "success";
          this.notification(message, type);
          var redirectUrl = response.charges.data[0].receipt_url;
          //this.navigateTo(redirectUrl);
        } else {
          this.transactionId = response.error.payment_intent.id;
          this.gatewayMessage = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].outcome
                .seller_message
            )
          );
          this.gatewayStatus = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].outcome
                .network_status
            )
          );
          this.transactionstatus =
            response.error.payment_intent.charges.data[0].status;
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }
        this.createTransactionRecord(
          this.transactionId,
          this.transactionstatus,
          this.gatewayMessage,
          this.gatewayStatus
        );
      })
      .catch((err) => {
        console.log(err);
      });
  
}
  notification(message, type) {
    console.log("Invoked toast function");
    if (type == "success") {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "warning") {
      toast.warning(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "error") {
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "info") {
      toast.info(message, { position: toast.POSITION.TOP_CENTER });
    }
  }
  navigateTo(url) {
    console.log("Invoked navigation function-->");
    window.location.href = url;
  }
  createTransactionRecord(transactionId,transactionstatus,gatewayMessage,gatewayStatus) {
    console.log("Invoked Create Transaction Record");
    const queryParams = new URLSearchParams(window.location.search);
    this.contId = queryParams.get("contactId");
    if(this.contId){
      this.contactId = this.contId;
    }
    else{
      this.contactId = window.contId;
    }
    var transactionParams = {};
    transactionParams.paymentGatewayIdentifier = transactionId;
    transactionParams.Amount = this.amount;
    transactionParams.transactionEmail = "akshayasreekumar@gmail.com";
    transactionParams.transactionCurrencyCode = "USD";
    transactionParams.transactionOrder = "8015f000001ZzCDAA0";
    transactionParams.transactionContact = this.contactId;
    transactionParams.processedDateTime = this.todaysDate;
    transactionParams.transactionStatus = transactionstatus;
    transactionParams.gatewayMessage = gatewayMessage;
    transactionParams.gatewayNetworkStatus = gatewayStatus;
    var url =
      "https://crma-pay-developer-edition.na163.force.com/InteractPay/services/apexrest/crma_pay/InteractPayAuthorization/?methodType=POST&inputParams=" +
      JSON.stringify(transactionParams);
    console.log("this.final transaction url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.contactId = response;
        console.log(" create  transaction-->" + JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }
  closeModal() {
    console.log("Invoked close popup");
      this.setState({
        newcontact: false,
      });
  }
  closeCardModal() {
    console.log("Invoked close popup");
      this.setState({
        isnewcard: false,
        //isClick: true
      });
  }
  handleCardInput(event) {
    console.log("Invoked create handleCardInput");
    const target = event.target;
    if (target.name == "cardName") {
      this.cardName = target.value;
    }
    if (target.name == "cardNumber") {
      this.cardNumber = target.value;
    }
    if (target.name == "expMonth") {
      this.expMonth = target.value;
    }
    if (target.name == "expYear") {
      this.expYear = target.value;
    }
    if (target.name == "cardCVV") {
      this.cardCVV = target.value;
    }
// card validation
if((this.cardName != null)&& (this.cardNumber!= null) && (this.expMonth!= null) && (this.expYear!= null)&& (this.cardCVV != null)){
      this.setState({
        isSaveCard : true
      })
    }
    else{
      this.setState({
        isSaveCard : false
      })
  
    }
  }
  
  
  createPaymentMethod() {
    //console.log("testing the ischeck variable---------->",this.isCheckValue)
    this.paymenttype = "card";
    var createMethodUrl =
      "https://api.stripe.com/v1/payment_methods" +
      "?type=" +
      this.paymenttype +
      "&card[number]=" +
      this.cardNumber +
      "&card[exp_month]=" +
      this.expMonth +
      "&card[exp_year]=" +
      this.expYear +
      "&card[cvc]=" +
      this.cardCVV;
    fetch(createMethodUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization:
          "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.id) {
          this.paymentMethodId = response.id;
          console.log("paymentId ===> " + this.paymentMethodId);
          this.attachPaymentmethod(this.paymentMethodId, this.customerId);
           //calling the fuction for making card as default
          //  setTimeout(function () {this.paymentMethodId && this.isCheckValue? this.defaultCardPayment(this.paymentMethodId, this.customerId): null}, 30000)
  //     if(this.paymentMethodId){
  //       console.log("here we gets payment method id for default payment")
  //     if(this.isCheckValue){
  //       console.log("from here defaultpayment function callsss---------")
  //       this.defaultCardPayment(this.paymentMethodId, this.customerId);
  //     }
      
  // }
          
        } else {
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      })
      ;
     
}
  //defining the method defaultCardPayment for calling the API for making card as default
  defaultCardPayment(paymentId,customerId){
    console.log("-------------------defaultCardPayment-------------------")
    console.log("makeDefaultPaymentMethod.customerId---->" + customerId);
    var defaultpaymentUrl = "https://api.stripe.com/v1/customers/" + customerId + "?invoice_settings[default_payment_method]=" +paymentId;
    console.log("defaultpaymentUrl---->" + defaultpaymentUrl);
    fetch(defaultpaymentUrl, // End point URL 
      {
        method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization:
          "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
      },
      })
      .then((response) => {
        console.log('response ===> ' + JSON.stringify(response));
        return response.json(); // returning the response in the form of JSON
      })
      .then((jsonResponse) => {
        console.log('jsonResponse ===> ' + JSON.stringify(jsonResponse));
        if (jsonResponse.id) {
          console.log('update contact ===> ');
          this.updateContact(paymentId);
        }
      })
      .catch(error => {
        console.log('callout error ===> ' + JSON.stringify(error));
      })

  }
  //update contact with paymentMethod Id
  updateContact(paymentId){
    console.log("<<<<--------------------this is for updating contact with default payment Id----------->>>>")
    var updateContactParams = {};
    console.log("Invoked update Contact");
    const queryParams = new URLSearchParams(window.location.search);
    this.contId = queryParams.get("contactId");
    if(this.contId){
      this.contactId = this.contId;
    }
    else{
      this.contactId = window.contId;
    }
    updateContactParams.defaultPaymentMethodId = paymentId;
    updateContactParams.contactId = this.contactId;
  
    var url =
      "https://crma-pay-developer-edition.na163.force.com/InteractPay/services/apexrest/crma_pay/InteractPayAuthorization/?methodType=POST&inputParams=" +
      JSON.stringify(updateContactParams);
    console.log("this.final transaction url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.contactId = response;
        console.log(" create  transaction-->" + JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      });
    
   

  }

  attachPaymentmethod(paymentMethodId, customerId) {
    console.log("this.customerId in attachPaymentmethod---->" + customerId);
    var attachUrl =
      "https://api.stripe.com/v1/payment_methods/" +
      paymentMethodId +
      "/attach?customer=" +
      customerId;
    fetch(attachUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization:
          "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("attach payment medthod----->", response);
        if (response.id) {
          // if(this.isdefault){
          //   console.log("isdefault---true--->" );
          // this.makeDefaultPaymentMethod(paymentId,customerId);
          // }
          //  //this.listPaymentMethods();
          // //this.iscard = false;
          this.closeCardModal();
          var message = "Your card is added successfully";
          var type = "success";
          this.notification(message, type);
        } else {
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }

        //this.handleTransaction(paymentId);
        // this.paymentId = jsonResponse.id;
        // console.log('paymentId ===> '+this.paymentId);
        // if(this.paymentId){
        //   this.attachPaymentmethod(this.paymentId,this.customerId);
        // }
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      })
      .finally(()=>{
        if(this.isCheckValue && this.paymentMethodId) {
          this.defaultCardPayment(this.paymentMethodId, this.customerId);
          console.log("from here defaultpayment function callsss---------")

        }
      });
  }

  

  render() {
    var achResponseList = this.state.achItems;
    console.log("Invoked render");
    const queryParams = new URLSearchParams(window.location.search);
    window.isContactExist = queryParams.get("isContactExist");
    console.log(" window.isConatctExist==>" + window.isContactExist);
    if (window.isContactExist == "true") {
      window.newContact = false;
      console.log("contact exxists--->");
    } else {
      if (window.isContactExist == "false") {
        console.log("contact createpopup--->");
        window.newContact = true;
        this.contactFlag++;
        if (this.contactFlag == 1) {
          this.setState({
            newcontact: true,
          });
        }
      }
    }
    console.log("window.isNewCard in onLOad  " + window.isNewCard);
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark  Interactpay my-3 py-0">
          <div class="container">
            <a class="navbar-brand" href="#">
              <div>
              <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i>
              <i class="material-icons"></i>
              <span class="ml-2 font-weight-bold">InterACT Pay</span>
              </div>
              <p class="Interactheader ml-sm-4">Your payment solution</p>
            </a>
          </div>
        </nav>
        <div class="container">
          <div class="row my-5">
            <div class="col-lg-4 col-md-4 col-sm-1">
              <div class="card p-3 mb-3">
                <h5 class="border-bottom pb-3">OrderSummary</h5>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Order Number</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>000157</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Product Name</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Sample Product Name</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Order Total</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>$ 999</p>
                  </div>
                </div>
              </div>
              <div class="card p-3">
                <h5 class="border-bottom pb-3">Billing Address</h5>
                <p>Kyle Hide</p>
                <p>Cape West Street</p>
                <p>Red Crown - New York US</p>
                <p>ZipCode: 341946</p>
              </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-1">
              <div class="card p-3">
                <div>
                  <div class="row">
                    <div class="col-md-10">
                      <h5 class=" p-3">
                        Please submit your payment details.
                      </h5>
                    </div>  
                      {this.state.isClick ? (
                        <button type="button" onClick={this.myFunction.bind(this)}> myButton </button>
              // <div className="drt_clearfix drt_CartableItem" onClick={() => props.callDetails()}></div>
              ) : (
                ""
              )}
                    <div class="col-md-2 float-right mt-2">
                      <div
                        class="btn-group btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <label class="btn btn-outline-primary " onClick={() => this.handleIsAchFalse()} >
                          <input
                            type="radio"
                            name="options"
                            id="option1"
                            autocomplete="off"
                            checked
                          />{" "}
                          Card
                        </label>
                        <label class="btn btn-outline-primary" onClick={() => this.handleIsAch()}>
                          <input
                            type="radio"
                            name="options"
                            id="option2"
                            autocomplete="off"
                            
                          />{" "}
                          ACH
                        </label>
                
                        <div class="btn-group">
                          <button
                            class="btn btn btn-light btn-sm dropdown-toggle ml-3 border-secondary"
                            type="button"
                            //id="dropdownMenuButton"
                            //data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={this.opendropdown}
                          >
                            <i class="fa fa-plus-square"></i>
                          </button>
                          {this.state.dropdown ? (
                            <div role="menu">
                              <div className="dropdownMenu">
                              <div>
                              <button class="border-0" onClick={() => this.handleAddCard()}>Add new card</button>
                              </div>
                              {/* <div>
                              <span  
                              // onClick={() => handleAddACH()}
                              >Add new ACH</span>
                              </div> */}
                              <div>
                                <Link onChange={this.onloadAchFetch}/>
                          
                              </div>
                              
                            </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.isAch? (
                    <div>
                    {achResponseList ? (
                      this.namesList = achResponseList.map((listValues, index) => (
                        <div>
                               <ul class="list-group  list-group-flush listDetails border">
                                   <li
                              class="d-flex justify-content-between align-items-center listDetails list-group-item"
                              data-id={listValues.id} name= "livalue"
                             onClick={event => this.selectedAchPaymentMethod(event)}
                            >
                              <div data-id={listValues.id}>
                                <p
                                  class="text-uppercase mb-1"
                                  data-id={listValues.id}
                                >
                                  {listValues.bank_name} ****{listValues.last4}
                                </p>
                                
                              </div>
                              <span>
                                <i class="fas fa-pencil-alt mr-3 text-dark"></i>
                                <i
                                  class="fas fa-trash-alt text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                  //onClick = {this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                ></i>
                              </span>
                            </li>
                            </ul> 
              
                            </div> 
                         
                        )
                        
                        
                    )) : (
                      <div>
                      <h7 class = "ml-4"> No Payment Methods are availabe.</h7>
                       </div>
                      )}
                      </div>

          ) : (
           <PaymentMethodList />
          )}
                
                {/* {ask} */}
                {/* <ul class="list-group list-group-flush listDetails">
                   {ask}
                </ul> */}
              </div>
              <button
                class="btn btn-primary float-right mt-4"
                onClick={this.createStripeTransaction}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
       {this.state.isnewcard ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon">x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center">
                  Please enter your card details.
                </h5>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label  class="ml-1 required">Name on the card</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="cardName" autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1 required">Card Number</label>
                    <input
                      type=" "
                      class="form-control"
                      id="inputEmail4"
                      name="cardNumber" autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1 required" >Expiry Month</label>
                    <input
                      placeholder="MM"
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="expMonth"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label  class="ml-1 required">Expiry Year</label>
                    <input
                      placeholder="YY"
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="expYear"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label  class="ml-1 required">CVV</label>
                    <input
                      placeholder="CVV"
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="cardCVV"
                      onChange={this.handleCardInput}
                    />
                  </div>                  
                </div>
              </form>
              
             
              <div class="flex-container">
              {/* make default card */}
              {/* -------------------------------------------------------------------------- */}
              <input
               type="checkbox"
               id="default"
               onChange={this.handleChechBox}
               
             
        />
               <span>Make this card as default</span>
              {/* -------------------------------------------------------------------------- */}

               
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeCardModal()}
                >
                  {" "}
                  Cancel
                </button>
                {this.state.isSaveCard ? (
               <button
               class="btn btn-primary float-right mr-3"
               onClick={() => this.createPaymentMethod()}
             >
               Save
             </button>
              ) : (
                <button
                class="btn btn-primary float-right mr-3" disabled
                //onClick={() => this.createContact() }
              >
                Save
              </button>
        )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.newcontact ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon">x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center">
                  Please enter the below details to proceed!
                </h5>
                <div class="form-row">
                  <h5>Contact Information</h5>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label class="ml-1 fname">FirstName</label>
                    <input
                      type="text"
                      class="form-control"
                      name="fname"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                  {/* <i class="fa fa-asterisk" style="font-size:24px;color:red"></i> */}
                    <label class="ml-1 required">LastName</label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="lname"  autocomplete="off"
                      //class="form-control is-invalid"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1 required">Email</label>
                    <input
                      type="email "
                      class="form-control"
                      id=""
                      name="email"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1 required">Phone</label>
                    <input
                      type="number "
                      class="form-control"
                      id=""
                      name="phone"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <h5>Address</h5>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      name="street"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="city"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">State</label>
                    <input
                      type="text "
                      class="form-control"
                      id="inputEmail4"
                      name="state"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Zip</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      name="zip"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="country"  autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </form>
              <button
                class="btn btn-outline-primary float-right"
                onClick={() => this.closeModal()}
              >
                Cancel
              </button>
              {this.state.isSave ? (
              <button
                class="btn btn-primary float-right mr-3"
                onClick={() => this.createContact() }
              >
                Save
              </button>
              ) : (
                <button
                class="btn btn-primary float-right mr-3" disabled
                //onClick={() => this.createContact() }
              >
                Save
              </button>
        )}
            </div>
          </div>
        ) : (
          ""
        )}
       </div>
    );
  }
}



function refreshPage() {
  console.log("invoked refresh fn--->");
  //const refreshPage = ()=>{
  window.location.reload();
  console.log("After refresh--->");
  //onloadeddata();
}

function selectedPaymentMethod(event) {
  //this.handleIsDelete();
  console.log("invoked selectedPaymentMethod on delete=====>");
  console.log("Invooked Method" + event.target.getAttribute("data-id"));
  window.paymentMethodId = event.target.getAttribute("data-id");
  var acc = document.querySelectorAll(".list-group-item");
  for (let i = 0; i < acc.length; i++) {
    if (acc[i].classList.contains("activeList")) {
      acc[i].classList.remove("activeList");
    }
  }
  let _listItems = event.target;
  _listItems.classList.add("activeList");
}

function showpopup() {
  console.log("Invoked Popup function");
  window.ispopuptrue = true;
}

export default App;
