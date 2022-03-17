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
import {
  IoMdAddCircle,
  IoMdInformationCircle,
  IoMdTrash,
  IoMdCreate,
} from "react-icons/io";
//import Link from "./components/Link";
//import axios from "axios";
var Modal = require("react-bootstrap-modal");
var achpaymentMethodId;

toast.configure();
class App extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    this.urlCustomerId = queryParams.get("customerId");
    this.urlContactId = queryParams.get("contactId");
    this.urlOrderId = queryParams.get("orderId");
    this.urlAmount = queryParams.get("amount");
    this.urlmail = queryParams.get("mail");
    this.baseUrl = queryParams.get("baseUrl");
    const current = new Date();
    this.todaysDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;

    this.handleIsAch = this.handleIsAch.bind(this);
    this.handleIsAchFalse = this.handleIsAchFalse.bind(this);
    this.createContact = this.createContact.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.onloadAchFetch = this.onloadAchFetch.bind(this);
    this.createStripeTransaction = this.createStripeTransaction.bind(this);
    this.notification = this.notification.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    //this.createTransactionRecord = this.createTransactionRecord.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCardInput = this.handleCardInput.bind(this);
    //this.createPaymentMethod = this.createPaymentMethod.bind(this);
    this.opendropdown = this.opendropdown.bind(this);
    this.selectedAchPaymentMethod = this.selectedAchPaymentMethod.bind(this);
    this.handleChechBox = this.handleChechBox.bind(this);
    this.defaultCardPayment = this.defaultCardPayment.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.getContactDetails = this.getContactDetails.bind(this);
    //this.onloadeddata = this.onloadeddata.bind(this);
    this.onloadAchFetch = this.onloadAchFetch.bind(this);
    this.handleIsDelete = this.handleIsDelete.bind(this);
    //this.selectedPaymentMethod = this.selectedPaymentMethod.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    //this.deletePaymentMethod = this.deletePaymentMethod.bind(this);
    this.notification = this.notification.bind(this);
    //this.getContactDetails = this.getContactDetails.bind(this);
    this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
    this.handledDefaultChechBox = this.handledDefaultChechBox.bind(this);
    this.defaultCardPayment = this.defaultCardPayment.bind(this);
    this.state = { isDelete: false };
    this.state = { isEdit: false };
    this.state = { isAddressEdit: false };
    this.state = { isPaymentAvailable : false};
    this.state = { defaultId: [] };
    this.state = {brandLogo: ""};
    this.state = {
      items: [],
    };
    this.state = { isnewcard: false };
    this.state = { dropdown: false };
    this.state = { newcontact: false };
    this.state = { isClick: false };
    this.state = { isAch: false };
    this.state = { isSave: false };
    this.state = { isSaveCard: false };
    this.state = { updateAddress: false };
    this.state = { editCard: false };
    this.state = { OrderNumber: "" };
    this.state = { OrderTotal: "" };
    this.state = {Billingcity: ""};
    this.state = {Billingstreet: ""};
    this.state = {Billingstate: ""};
    this.state = {Billingzip: "",};
    this.state = {Billingcountry: ""};
    this.state = { expValue: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.updateBillingAddress = this.updateBillingAddress.bind(this);
    this.closeAddressModal = this.closeAddressModal.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.contactFlag = 0;
    this.state = {
      cardListShow: false,
    };
    this.state = {
      achItems: [],
    };
    this.state = {
      carditems: [],
    };
  }
  componentDidMount() {
    //this.getOrderDetails();
    this.getStripeKey();
    // this.getContactDetails();
    // this.onloadAchFetch();
    // this.onloadeddata();
    this.isCheckValue = false;
    this.isDefaultValue = false;
  }
  getStripeKey() {
    console.log("Invoked stripe key");
    console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams={}";
    // console.log("yyyyyyy---->"+y)
    // var url = "https://crma-pay-developer-edition.na163.force.com/InteractPay/services/apexrest/crma_pay/InteractPayAuthorization/?methodType=GET&inputParams={}";
    //console.log("this.final url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        // console.log(" Stripe key  -->" + JSON.stringify(response));
        // this.stripeKey = response;
        response = response.slice(1, response.length - 1);
        //console.log("RESponse    ------>", response);
        var mdt_Reponse = JSON.parse(response);
        var orderReponse = JSON.stringify(JSON.parse(response));
        this.stripeKey = mdt_Reponse.StripeKey;
        this.brandLogo = mdt_Reponse.BrandLogo;
        this.setState({brandLogo: this.brandLogo,});
        console.log("this.stripeKey--->"+this.stripeKey);
        console.log("this.brandLogo--->"+this.brandLogo);
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(() => {
        // this.x = this.stripeKey;
        // console.log(
        //   "from here defaultpayment function callsss---------" + this.x
        // );
        this.getContactDetails();
      });
  }
  selectedPaymentMethod(event) {
    console.log("invoked selectedPaymentMethod");
    console.log("Invooked Method" + event.target.getAttribute("data-id"));
    // console.log("Invooked expMonth" + event.target.getAttribute("data-expmonth"));
    this.initExpMonth = event.target.getAttribute("data-expmonth");
    //window.paymentMethodId = event.target.getAttribute("data-id");
    this.paymentMethodId = event.target.getAttribute("data-id");
    //this.x = window.paymentMethodId;
    var acc = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].classList.contains("activeList")) {
        acc[i].classList.remove("activeList");
      }
    }
    let _listItems = event.target;
    _listItems.classList.add("activeList");
  }
  getContactDetails() {
    // const queryParams = new URLSearchParams(window.location.search);
    //   this.contId = queryParams.get("contactId");
    console.log("new contact id inonload()" + this.newcontId);
    if (this.urlContactId) {
      this.contactId = this.urlContactId;
    } else {
      this.contactId = this.newContactId;
    }
    //this.default2Id = [];
    //console.log("Invoked OrderDetails");
    var contactParams = {};
    contactParams.contactId = this.contactId;
    //contactParams.contactId = "0035f00000KTfGYAA1";
     console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(contactParams);
    console.log("this.contact url ---->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        //console.log("RESponse    ------>", response);
        var contactReponse = JSON.parse(response);
        console.log("contactReponse    --QQQqQqQQQQQQQq---->" + contactReponse);
        console.log(
          "crma_pay__Default_Payment_Method__c#########",
          contactReponse.crma_pay__Default_Payment_Method__c
        );
        this.defaultId = contactReponse.crma_pay__Default_Payment_Method__c;
        this.onloadeddata(this.defaultId);
        // var x = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.default2Id.push(x);
        // this.setState({
        //   defaultId: this.default2Id,
        // });
        // console.log(" order detailsccc  --xxx--->" + this.default2Id);
        // this.onloadeddata(this.default2Id);
        // this.orderresponse = JSON.parse(JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(
        () =>
          //{
          console.log(
            "******08888888***+++++++++++//00/////////=*******$$$$$$$$$$" +
              this.state.defaultId
          )
        // this.setState({
        //   x: this.state.defaultId,
        //});
        //this.x = this.state.defaultId;
        //this.onloadeddata();
        //}
      );
    // console.log("Deafault---->" + this.state.defaultId);
    // console.log("this.x---->" + this.state.x);
  }
  getOrderDetails() {
    var orderParams = {};
    orderParams.orderId = this.urlOrderId;
    //contactParams.contactId = "0035f00000KTfGYAA1";
    console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(orderParams);
    console.log("this.order url ---->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        //console.log("RESponse    ------>", response);
        var contactReponse = JSON.parse(response);
        var orderReponse = JSON.stringify(JSON.parse(response));
        console.log("OrderReponse    --QQQqQqQQQQQQQq---->" + orderReponse);
        var orderNum = contactReponse.orderdetails[0].OrderNumber;
        var total = contactReponse.orderdetails[0].TotalAmount;
        var city = contactReponse.orderdetails[0].BillingAddress.city;
        var country = contactReponse.orderdetails[0].BillingAddress.country;
        var postalCode =
          contactReponse.orderdetails[0].BillingAddress.postalCode;
        var state = contactReponse.orderdetails[0].BillingAddress.state;
        var street = contactReponse.orderdetails[0].BillingAddress.street;
        console.log("street -1--->" + street);
        this.setState({OrderNumber: orderNum,});
        this.setState({ OrderTotal: total,});
        this.setState({Billingcity: city,});
        this.setState({Billingstreet: street,});
        this.setState({Billingstate: state,});
        this.setState({Billingzip: postalCode,});
        this.setState({Billingcountry: country,});
        console.log("this.state.OrderNumber -1--->" + this.state.OrderNumber);
        // console.log("crma_pay__Default_Payment_Method__c#########",contactReponse.crma_pay__Default_Payment_Method__c);
        // this.defaultId = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.onloadeddata(this.defaultId);
        // var x = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.default2Id.push(x);
        // this.setState({
        //   defaultId: this.default2Id,
        // });
        // console.log(" order detailsccc  --xxx--->" + this.default2Id);
        // this.onloadeddata(this.default2Id);
        // this.orderresponse = JSON.parse(JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(
        () =>
          //{
          console.log(
            "******08888888***+++++++++++//00/////////=*******$$$$$$$$$$" +
              this.state.defaultId
          )
        // this.setState({
        //   x: this.state.defaultId,
        //});
        //this.x = this.state.defaultId;
        //this.onloadeddata();
        //}
      );
    // console.log("Deafault---->" + this.state.defaultId);
    // console.log("this.x---->" + this.state.x);
  }
  //---------------------------------------------------------------------------------------------------------------------------
  onloadeddata(defaultPaymentId) {
    // onloadeddata() {
    console.log("invoke onload---->");
    // const queryParams = new URLSearchParams(window.location.search);
    // this.custId = queryParams.get("customerId");
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
    console.log("this.customerId in onloadxx---> " + this.customerId);
    //  if(this.customerId){
    fetch(
      "https://api.stripe.com/v1/payment_methods?type=card&customer=" +
        this.customerId,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log("ListPaymentMethods--->" +JSON.stringify(response));
        var cardList = response.data;
        //console.log('POSITIVE --------CARDLISTT----------->>>>>-+++----->>'+cardList[0].id)

        if(cardList.length !== 0){
          console.log('INSIDE IF to check-----');
          console.log('cardlist: ',cardList.length);
          this.setState({
              cardListShow: true,
            });
        
      }
      else {
        console.log('CARDLISTTTTTTTTT- IN ELSE---------->>>>>-+++----->>'+cardList)
        this.setState({
          cardListShow: false,
        });
      }
        
        
      //console.log('cardListShow------------->>>>'+this.State.cardListShow)
        //}
        var paymentMethodList = [];
        var jsonValues = JSON.parse(JSON.stringify(cardList));
        var crd = new Object();
        for (var i = 0; i < jsonValues.length; i++) {
          crd = jsonValues[i].card;
          crd.id = jsonValues[i].id;
          crd.name = jsonValues[i].billing_details.name;
          paymentMethodList.push(crd);
        }
        //console.log("*********************$$$$$$$$$$" + defaultPaymentId);
        //console.log("*********************"+this.state.defaultId)

        var defaultMethod = defaultPaymentId;
        //var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
        //window.paymentMethodId = defaultMethod;
        this.paymentMethodId = defaultMethod;
        for (var i = 0; i < paymentMethodList.length; i++) {
          if (paymentMethodList[i].id == defaultMethod) {
            paymentMethodList[i].isDefault = true;
          } else {
            paymentMethodList[i].isDefault = false;
          }
        }
        console.log("default ====> " + JSON.stringify(paymentMethodList));
        // console.log("----->namesList-->" + window.namesList);
        //   window.methodList =  JSON.stringify(paymentMethodList);
        //   window.out = paymentMethodList;
        //  return window.out;
        // this.methodList =  JSON.stringify(paymentMethodList);
        //   console.log("before changes--------------------------------------------")
        this.outlist = paymentMethodList;
        //console.log("this.outMount-->" + this.outlist);
        this.setState({
          carditems: this.outlist,
        }); 
        console.log('carditems----------------#############__________++++++++++_______________'+this.state.carditems)
        //setUser(this.out);
        //    let data = this.out;
        // resolve(data);
        //this.setState({data: this.out});
        //  console.log("dtaa----->"+this.state.data)
        // return this.out;
      })
      //}
      // useEffect(()=>{
      //   fetchData();
      // },[])
      .catch((err) => {
        console.log(err);
      });
    // })

    //  var newlist = [];
    // var newlist = window.out;
    // // var newlist = this.out;
    // // console.log("return newlist-->" + newlist);
    // return newlist;
  }
  onloadAchFetch() {
    // //ach payments

    //list ach payment in UI
    console.log("invoked onloadfetchAch()!!!!");
    fetch("https://api.stripe.com/v1/customers/cus_LCimCtUYQ8o7iW/sources", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log("ListPaymentMethods--->" +JSON.stringify(response));
        var achList = response.data;
        this.outAch = achList;
        console.log("ach list--------------" + JSON.stringify(achList));
        this.setState({
          achItems: this.outAch,
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
    console.log("invoked selectedAchPaymentMethod =====>");
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
    if (this.state.dropdown == false) {
      console.log("invoke dropdown if false");
      this.setState({ dropdown: true });
    } else {
      this.setState({ dropdown: false });
      console.log("invoke dropdown if true");
    }
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
    if (this.lname && this.email && this.phone) {
      this.setState({
        isSave: true,
      });
    } else {
      this.setState({
        isSave: false,
      });
    }
    //this.inputParams.salutation = "Mr";
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
  handleAddressChange(event) {
    console.log("Invoked create handleInputChange.");
    this.newAddressParams = {};
    const target = event.target;
    if (target.name == "Billingstreet") {
      this.street = target.value;
    }
    if (target.name == "Billingcity") {
      this.city = target.value;
    }
    if (target.name == "Billingstate") {
      this.State = target.value;
    }
    if (target.name == "Billingzip") {
      this.zip = target.value;
    }
    if (target.name == "Billingcountry") {
      this.country = target.value;
    }
    if (this.street || this.city || this.State || this.zip || this.country) {
      this.setState({
        updateAddress: true,
      });
    } else {
      this.setState({
        updateAddress: false,
      });
    }
    this.newAddressParams.billingStreet = this.street;
    this.newAddressParams.billingCity = this.city;
    this.newAddressParams.billingState = this.State;
    this.newAddressParams.billingZip = this.zip;
    this.newAddressParams.billingCountry = this.country;
    console.log("this.urlParam--->" + JSON.stringify(this.newAddressParams));
  }
  handleEditInput(event){
    console.log("Invoked create handleEditInput.");
  const target = event.target;
  if (target.name == "newExpYear") {
    this.newExpYear = target.value;
  }
  if (target.name == "newExpMonth") {
    this.newExpMonth = target.value;
  }
  
  if (this.newExpYear || this.newExpMonth) {
    this.setState({
      editCard: true,
    });
  } else {
    this.setState({
      editCard: false,
    });
  }}
  updateBillingAddress(){
    console.log("Invoked updateBillingAddress"+ JSON.stringify(this.newAddressParams));
    this.newAddressParams.orderId = this.urlOrderId
    console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
      JSON.stringify(this.newAddressParams);
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
         var orderId = response;
        console.log(" update  address-->" + JSON.stringify(response));
        if(orderId){
          if(this.newAddressParams.billingCity){
            this.setState({Billingcity: this.newAddressParams.billingCity,});
          }
          if(this.newAddressParams.billingStreet){
            this.setState({Billingstreet: this.newAddressParams.billingStreet,});
          }
          if(this.newAddressParams.billingState){
            this.setState({Billingstate: this.newAddressParams.billingState,});
          }
          if(this.newAddressParams.billingZip){
            this.setState({Billingzip: this.newAddressParams.billingZip,});
          }
          if(this.newAddressParams.billingCountry){
            this.setState({Billingcountry: this.newAddressParams.billingCountry,});
          }
        }
      })
      .catch((err) => {
        console.log("err" + err);
      });
    
        this.setState({isAddressEdit: false,});
  }
  handleAddCard() {
    console.log("invoked handleAddCard ------>");
    this.setState({
      isnewcard: true,
      dropdown: false,
    });
  }
  handleIsDelete(event) {
    console.log("Invooked delete1" + event.target.getAttribute("data-id"));
    console.log("handleDelete isInvoked ----->");
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
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.newcustomerId = response.id;
        // window.custId = this.newcustomerId;
        console.log("customer create -->" + response.id);
        if (this.newcustomerId) {
          this.inputParams.customerId = this.newcustomerId;
          console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
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
              this.newContactId = this.contactId;
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
  //handle ach flag =true here.....................
  handleIsAch() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isAch: true,
    });
  }
  //handle checkbox of default card
  handleChechBox() {
    if (this.isCheckValue == false) {
      // this.setState({
      this.isCheckValue = true;
      // })
    } else {
      // this.setState({
      this.isCheckValue = false;
      // })
    }

    // console.log("isCheckValue----------",this.state.isCheckValue)
    console.log("isCheckValue----------", this.isCheckValue);
  }

  //handle ach flag =False here.....................
  handleIsAchFalse() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isAch: false,
    });
  }

  // '----------------This is Create Payment Intent-------------------------------------------
  createStripeTransaction() {
    console.log("Invoked createTransaction");
    // const queryParams = new URLSearchParams(window.location.search);
    // this.amount = queryParams.get("amount");
    console.log("this.urlAmount --->" + this.urlAmount);
    var conAmount = this.urlAmount + "00";
    //console.log("concatedamount --->"+conAmount);
    //this.custId = queryParams.get("customerId");
    // var transactionUrl;
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
    //this.contactId = queryParams.get("contactId");
    console.log("this,payementmethodId---->" + this.paymentMethodId);
    // this.paymentMethodId = window.paymentMethodId;
    //if ach payment id exists, then call the stripe api for ach payment
    if (achpaymentMethodId) {
      var transactionUrl =
        "https://api.stripe.com/v1/charges?amount=999&currency=usd&customer=cus_LCimCtUYQ8o7iW&source=" +
        achpaymentMethodId;
      console.log("transactionUrl-->" + transactionUrl);
    }
    if (this.paymentMethodId) {
      var transactionUrl =
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
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("transactionresponse" + JSON.stringify(response));
        if (response.id) {
          this.transactionId = response.id;
          this.transactionstatus = response.status;
          var currency = response.currency;
          if(response.charges.data[0]){
          this.gatewayMessage = JSON.parse(
            JSON.stringify(response.charges.data[0].outcome.seller_message)
          );
          this.gatewayStatus = JSON.parse(
            JSON.stringify(response.charges.data[0].outcome.network_status)
          );
          }
          // var currency = JSON.parse(
          //   JSON.stringify(response.charges.data[0].currency)
          // );
          this.currencyCode = currency.toUpperCase();
          //console.log("this.currencyCode-->"+this.currencyCode);
          var message = "Your payment is successfully completed";
          var type = "success";
          this.notification(message, type);
          //var redirectUrl = response.charges.data[0].receipt_url;
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
          var currency = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].currency
            )
          );
          this.currencyCode = currency.toUpperCase();
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }
        this.createTransactionRecord(
          this.transactionId,
          this.transactionstatus,
          this.gatewayMessage,
          this.gatewayStatus,
          this.currencyCode
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
  createTransactionRecord(
    transactionId,
    transactionstatus,
    gatewayMessage,
    gatewayStatus,
    currencyCode
  ) {
    console.log("Invoked Create Transaction Record");
    // const queryParams = new URLSearchParams(window.location.search);
    // this.contId = queryParams.get("contactId");
    // if (this.contId) {
    //   this.contactId = this.contId;
    // } else {
    //   this.contactId = window.contId;
    // }
    if (this.urlContactId) {
      this.contactId = this.urlContactId;
    } else {
      this.contactId = this.newContactId;
    }
    if (this.urlmail) {
      this.mail = this.urlmail;
    } else {
      this.mail = this.email;
    }
    var transactionParams = {};
    transactionParams.paymentGatewayIdentifier = transactionId;
    transactionParams.Amount = this.urlAmount;
    transactionParams.transactionEmail = this.mail;
    transactionParams.transactionCurrencyCode = currencyCode;
    transactionParams.transactionOrder = this.urlOrderId;
    transactionParams.transactionContact = this.contactId;
    transactionParams.processedDateTime = this.todaysDate;
    transactionParams.transactionStatus = transactionstatus;
    transactionParams.gatewayMessage = gatewayMessage;
    transactionParams.gatewayNetworkStatus = gatewayStatus;
    console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
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
  closeAddressModal() {
    console.log("Invoked close popup");
    this.setState({
      isAddressEdit: false,
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
    //   // if(this.expMonth.length==2){
    //   // console.log("Exp Month length in if"+ this.expMonth.length);
    //   // this.setState({
    //   //   expValue: this.expMonth+'/',
    //   // });
    //   // console.log("setState expValue in if"+ this.state.expValue);
    //   // }
    //   if(typeof this.expMonth == 'number' || this.expMonth ==0 || this.expMonth<13){
    //     console.log("All conditions are met")
    //     if(this.expMonth.length==2){
    //       console.log("Exp Month length in if"+ this.expMonth.length);
    //       this.setState({
    //         expValue: this.expMonth+'/',
    //       });
    //       console.log("setState expValue in if"+ this.state.expValue);
    //       }
    //   }
    // //   if(this.expMonth.length==3){
    // //   this.setState({
    // //     expValue: this.expMonth,
    // //   });
    // // }
    //   console.log("final exp month year"+this.expMonth)
    }
    if (target.name == "expYear") {
      this.expYear = target.value;
    }
    if (target.name == "cardCVV") {
      this.cardCVV = target.value;
    }
    // card validation
    if (
      this.cardName != null &&
      this.cardNumber != null &&
      this.expMonth != null &&
      this.expYear != null &&
      this.cardCVV != null
    ) {
      this.setState({
        isSaveCard: true,
      });
    } else {
      this.setState({
        isSaveCard: false,
      });
    }
  }

  createPaymentMethod() {
    console.log("Invoked createPaymentMethod");
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
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
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.id) {
          this.paymentMethodId = response.id;
          console.log("paymentId ===> " + this.paymentMethodId);
          this.attachPaymentmethod(this.paymentMethodId, this.customerId);
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
      });
  }
  //defining the method defaultCardPayment for calling the API for making card as default
  defaultCardPayment(paymentId, customerId) {
    console.log("-------------------defaultCardPayment-------------------");
    console.log("makeDefaultPaymentMethod.customerId---->" + customerId);
    var defaultpaymentUrl =
      "https://api.stripe.com/v1/customers/" +
      customerId +
      "?invoice_settings[default_payment_method]=" +
      paymentId;
    console.log("defaultpaymentUrl---->" + defaultpaymentUrl);
    fetch(
      defaultpaymentUrl, // End point URL
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => {
        console.log("default 1st response")
        console.log("response ===> " + JSON.stringify(response));
        return response.json(); // returning the response in the form of JSON
      })
      .then((jsonResponse) => {
        console.log("default 2st response")
        console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        if (jsonResponse.id) {
          console.log("update contact ===> ");
          this.updateContact(paymentId);
        }
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
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
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("attach payment medthod----->", response);
        if (response.id) {
          if (this.isCheckValue) {
            console.log("If is default true");
            this.defaultCardPayment(paymentMethodId, customerId);
            console.log("from here defaultpayment function callsss---------");
          }
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
          //this.onloadeddata();
          this.getContactDetails();
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
        //this.onloadeddata();
      });
    // .finally(() => {
    //   if (this.isCheckValue && this.paymentMethodId) {
    //     this.defaultCardPayment(this.paymentMethodId, this.customerId);
    //     console.log("from here defaultpayment function callsss---------");
    //   }
    // });
    //this.onloadeddata();
  }
  handleIsDelete() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isDelete: true,
    });
  }
  handledDefaultChechBox() {
    if (this.isDefaultValue == false) {
      // this.setState({
      this.isDefaultValue = true;
      // })
    } else {
      // this.setState({
      this.isDefaultValue = false;
      // })
    }

    // console.log("isCheckValue----------",this.state.isCheckValue)
    console.log("isCheckValue----------", this.isDefaultValue);
  }
  handleIsEdit() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isEdit: true,
    });
  }
  handleIsAddressEdit() {
    console.log("invoked handleIsAddressEdit ");
    this.setState({
      isAddressEdit: true,
    });
  }
  
  closeDeleteModal() {
    console.log("Invoked close popup");
    this.setState({
      isDelete: false,
    });
  }
  closeEditModal() {
    console.log("Invoked close popup");
    this.setState({
      isEdit: false,
    });
  }
  updatePaymentMethod() {
    // const queryParams = new URLSearchParams(window.location.search);
    // this.custId = queryParams.get("customerId");
    // if (this.custId) {
    //   this.customerId = this.custId;
    // } else {
    //   this.customerId = window.custId;
    // }
    console.log("this.newExpMonth"+this.newExpMonth);
    //var updatePaymentMethodUrl = "https://api.stripe.com/v1/payment_methods/" + this.pmId + "?card[exp_month]=" + this.expiryMonth + "&card[exp_year]=" + this.expiryYear;
    if (this.isDefaultValue) {
      this.defaultCardPayment(this.paymentMethodId, this.customerId);
    }
    var updatePaymentMethodUrl =
    "https://api.stripe.com/v1/payment_methods/" + this.paymentMethodId + "?card[exp_month]=" + this.newExpMonth + "&card[exp_year]=" + this.newExpYear;
    console.log("updatePaymentMethodUrl==>" + updatePaymentMethodUrl);
    fetch(updatePaymentMethodUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(" paymentMethodId response -->" + JSON.stringify(response));
        // var message = " Card Deleted";
        // var type = "success";
        // this.notification(message, type);
        this.getContactDetails();
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      });
    this.closeEditModal();
  }
  defaultCardPayment(paymentId, customerId) {
    console.log("-------------------defaultCardPayment-------------------");
    console.log("makeDefaultPaymentMethod.customerId---->" + customerId);
    var defaultpaymentUrl =
      "https://api.stripe.com/v1/customers/" +
      customerId +
      "?invoice_settings[default_payment_method]=" +
      paymentId;
    console.log("defaultpaymentUrl---->" + defaultpaymentUrl);
    fetch(
      defaultpaymentUrl, // End point URL
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => {
        console.log("response ===> " + JSON.stringify(response));
        return response.json(); // returning the response in the form of JSON
      })
      .then((jsonResponse) => {
        console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        if (jsonResponse.id) {
          console.log("update contact ===> ");
          this.updateContact(paymentId);
        }
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
      });
  }
  updateContact(paymentId) {
    console.log(
      "<<<<------------------this is for updating contact with default payment Id----------->>>>"
    );
    var updateContactParams = {};
    console.log("Invoked update Contact");
    const queryParams = new URLSearchParams(window.location.search);
    this.contId = queryParams.get("contactId");
    if (this.contId) {
      this.contactId = this.contId;
    } else {
      this.contactId = window.contId;
    }
    updateContactParams.defaultPaymentMethodId = paymentId;
    updateContactParams.contactId = this.contactId;

    console.log("baseUrls--->"+this.baseUrl);
    var url =    this.baseUrl + "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
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
        this.onloadeddata(paymentId);
      })
      .catch((err) => {
        console.log("err" + err);
      });

  }
  deletePaymentMethod(event) {
    console.log("invoked deletePaymentMethod");
    //this.payMethodId = event.target.getAttribute("data-id");
    //this.payMethodId = this.x;
    console.log(" delete id *******===>" + this.paymentMethodId);
    var deleteUrl =
      "https://api.stripe.com/v1/payment_methods/" +
      this.paymentMethodId +
      "/detach";
    console.log("deleteUrl==>" + deleteUrl);
    fetch(deleteUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(" delete response -->" + JSON.stringify(response));
        var message = " Card Deleted";
        var type = "success";
        this.notification(message, type);
        this.onloadeddata();
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      });
    this.closeDeleteModal();
    //this.render();
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
  }
  refreshPage() {
    console.log("invoked refresh fn--->");
    //const refreshPage = ()=>{
    window.location.reload();
    console.log("After refresh--->");
    //onloadeddata();
  }

  render() {
    var achResponseList = this.state.achItems;
    var cardlist = this.state.carditems;
    console.log('cardlist------------------------------&&&&&&&&&&&&&&&&&&&&&________________________**********'+cardlist)
    var isPayShow = this.state.cardListShow;
    console.log("Invoked render---->"+this.state.expValue);
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
          <div class="container py-3">
            <a class="navbar-brand" href="#">
            < img src ={this.state.brandLogo} height="25"/>
              </a>
            <a class="navbar-brand text-right" href="#">
              <p class="Interactheader ml-sm-4 m-0 ">POWERED BY</p>
              <div>
              <IoMdInformationCircle />
                {/* <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i> */}
                <i class="material-icons"></i>
                <span class="ml-2 font-weight-bold">InterACT Pay</span>
              </div>
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
                    <p>{this.state.OrderNumber}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Order Total</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>$ {this.state.OrderTotal}</p>
                  </div>
                </div>
              </div>
              <div class="card p-3">
                <h5 class="border-bottom pb-3">Billing Address <IoMdCreate
                onClick={() => this.handleIsAddressEdit()}
                /></h5>
                
                <p>{this.state.Billingstreet}</p>
                <p>{this.state.Billingcity}</p>
                <p>{this.state.Billingstate} - {this.state.Billingcountry}</p>
                <p>ZipCode: {this.state.Billingzip}</p>
              </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-1">
              <div class="card p-3">
                <div>
                  <div class="row">
                    <div class="col-md-10">
                      <h5 class=" p-3">Please submit your payment details..</h5>
                    </div>
                    {this.state.isClick ? (
                      <button
                        type="button"
                        onClick={this.myFunction.bind(this)}
                      >
                        {" "}
                        myButton{" "}
                      </button>
                    ) : (
                      // <div className="drt_clearfix drt_CartableItem" onClick={() => props.callDetails()}></div>
                      ""
                    )}
                    <div class="col-md-2 float-right mt-2">
                      <div
                        class="btn-group btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <label
                          class="btn btn-outline-primary "
                          onClick={() => this.handleIsAchFalse()}
                        >
                          <input
                            type="radio"
                            name="options"
                            id="option1"
                            autocomplete="off"
                            checked
                          />{" "}
                          Card
                        </label>
                        <label
                          class="btn btn-outline-primary"
                          onClick={() => this.handleIsAch()}
                        >
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
                          ><IoMdAddCircle />
                            {/* <i class="fa fa-plus-square"></i> */}
                          </button>
                          {this.state.dropdown ? (
                            <div role="menu">
                              <div className="dropdownMenu">
                                <div>
                                  <button
                                    class="border-0"
                                    onClick={() => this.handleAddCard()}
                                  >
                                    Add new card
                                  </button>
                                </div>
                                {/* <div>
                              <span  
                              // onClick={() => handleAddACH()}
                              >Add new ACH</span>
                              </div> */}
                                <div>
                                  <h7>ACH Pending</h7>
                                  {/* <Link onChange={this.onloadAchFetch} /> */}
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
                {this.state.isAch ? (
                  <div>
                    {achResponseList ? (
                      (this.namesList = achResponseList.map(
                        (listValues, index) => (
                          <div>
                            <ul class="list-group  list-group-flush listDetails border">
                              <li
                                class="d-flex justify-content-between align-items-center listDetails list-group-item"
                                data-id={listValues.id}
                                name="livalue"
                                onClick={(event) =>
                                  this.selectedAchPaymentMethod(event)
                                }
                              >
                                <div data-id={listValues.id}>
                                  <p
                                    class="text-uppercase mb-1"
                                    data-id={listValues.id}
                                  >
                                    {listValues.bank_name} ****
                                    {listValues.last4}
                                  </p>
                                </div>
                                <span>
                                <span pr-3>
                                  <IoMdCreate data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()} />
                                </span> 
                                <IoMdTrash
                                  data-id={listValues.id}
                                  //onClick={(event) =>
                                    //this.selectedPaymentMethod(event)
                                 // }
                                //  onClick={(event) =>
                                //   this.handleIsDelete(event)
                               //}
                                  onClick={() => this.handleIsDelete()}
                                />
                                {/* <i
                                  class="fas fa-pencil-alt mr-3 text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()}
                                ></i>*/}
                                {/* <i
                                  class="fas fa-trash-alt text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                  //onClick = {this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                ></i>  */}
                              </span>
                              </li>
                            </ul>
                          </div>
                        )
                      ))
                    ) : (
                      <div>
                        <h7 class="ml-4"> No Payment Methods are availabe.</h7>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* <PaymentMethodList /> */}
                    {this.state.cardListShow ? (
                    
                      (this.namesList = cardlist.map((listValues, index) => (
                        <div>
                          <ul class="list-group  list-group-flush listDetails border">
                            <li
                              class="d-flex justify-content-between align-items-center listDetails list-group-item"
                              data-id={listValues.id}
                              name="livalue"
                              data-expmonth={listValues.exp_month}
                              onClick={(event) =>
                                this.selectedPaymentMethod(event)
                              }
                            >
                              <div data-id={listValues.id}>
                                <p
                                  class="text-uppercase mb-1"
                                  data-id={listValues.id}
                                >
                                  {listValues.brand} ****{listValues.last4}
                                </p>
                                <p
                                  class="text-black-50 mb-0"
                                  data-id={listValues.id}
                                >
                                  Expires on: {listValues.exp_month}/
                                  {listValues.exp_year}
                                  {listValues.isDefault ? (
                                    <span class="badge badge-pill badge-primary ml-4">
                                      Default
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <span>
                                <span pr-3>
                                  <IoMdCreate 
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()} 
                                  />
                                </span>
                                <span 
                                  //onClick={(event) =>this.selectedPaymentMethod(event)}
                                  >
                                <IoMdTrash data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}/>
                                </span>
                                {/* <i
                                  class="fas fa-pencil-alt mr-3 text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()}
                                ></i>
                                <i
                                  class="fas fa-trash-alt text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                  //onClick = {this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                ></i> */}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )))
                    ) : (
                      
                      <div>
                        <h7 class="ml-4"> No Payment Methods are availabe.</h7>
                      </div>
                    )}
                  </div>
                )}

                {/* {ask} */}
                {/* <ul class="list-group list-group-flush listDetails">
                   {ask}
                </ul> */}
                
              </div>
              {this.state.cardListShow ? (
                <button
                class="btn btn-primary float-right mt-4"
                onClick={this.createStripeTransaction}
              >
                Pay
              </button>
              ) : (
                <button
                class="btn btn-primary float-right mt-4" disabled
                onClick={this.createStripeTransaction}
              >
                Pay
              </button>
              )}
              
              
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
                    <label class="ml-1 required">Name on the card</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="cardName"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1 required">Card Number</label>
                    <input
                      type=" "
                      class="form-control"
                      id="inputEmail4"
                      name="cardNumber"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1 required">Expiry Month</label>
                    <input
                      placeholder="MM"
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="expMonth"
                      value={this.state.expValue}
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1 required">Expiry Year</label>
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
                    <label class="ml-1 required">CVV</label>
                    <input
                      placeholder="CVV"
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="cardCVV"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  {/* <div class="form-group col-md-4">
                  <input placeholder="MM/YY" type="tel" name="expiry" 
                              //oninput={handleExpiryInput} onblur={handleExpiryInput} 
                              style=" width:250px;"></input></div> */}
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
                    class="btn btn-primary float-right mr-3"
                    disabled
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
                      name="fname"
                      autocomplete="off"
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
                      name="lname"
                      autocomplete="off"
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
                      name="email"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1 required">Phone</label>
                    <input
                      type="number "
                      class="form-control"
                      id=""
                      name="phone"
                      autocomplete="off"
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
                      name="street"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="city"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">State</label>
                    <input
                      type="text "
                      class="form-control"
                      id="inputEmail4"
                      name="state"
                      autocomplete="off"
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
                      name="zip"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="country"
                      autocomplete="off"
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
                  onClick={() => this.createContact()}
                >
                  Save
                </button>
              ) : (
                <button
                  class="btn btn-primary float-right mr-3"
                  disabled
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
        {this.state.isDelete ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon">x</span>
              <h5 class="border-bottom mb-4 text-center">
                Delete PaymentMethod.
              </h5>
              <p class="border-bottom pb-4 text-center">
                Are you sure you want to delete this card?
              </p>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeDeleteModal()}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  class="btn btn-primary float-right mr-3"
                  //onClick={() => this.deletePaymentMethod()}
                  onClick={(event) => this.deletePaymentMethod(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.isEdit ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon">x</span>
              <p class="border-bottom pb-4 text-center">
                Edit the paymentMethod?
              </p>
              <div class="form">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="ml-1 ">Year</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="newExpYear"
                      autocomplete="off"
                      onChange={this.handleEditInput}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label class="ml-1 ">Month</label>
                    <input
                      type=" "
                      class="form-control"
                      id="inputEmail4"
                      name="newExpMonth"
                      autocomplete="off"
                      onChange={this.handleEditInput}
                    />
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="default"
                  onChange={this.handledDefaultChechBox}
                />
                <span>Make this card as default</span>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeEditModal()}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  class="btn btn-primary float-right mr-3"
                  //onClick={() => this.deletePaymentMethod()}
                  onClick={(event) => this.updatePaymentMethod(event)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.isAddressEdit ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon">x</span>
              <h5 class="border-bottom mb-4 text-center">
                Edit Billing Address
              </h5>
              <div class="form">
              <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail"
                      name="Billingstreet"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword"
                      name="Billingcity"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">State</label>
                    <input
                      type="text "
                      class="form-control"
                      id="inputEmail"
                      name="Billingstate"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Zip</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      name="Billingzip"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword5"
                      name="Billingcountry"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeAddressModal()}
                >
                  {" "}
                  Cancel
                </button>
                {this.state.updateAddress ? (
                <button
                  class="btn btn-primary float-right mr-3"
                  onClick={() => this.updateBillingAddress()}
                >
                  Update Address
                </button>
              ) : (
                <button
                  class="btn btn-primary float-right mr-3"
                  disabled
                  //onClick={() => this.createContact() }
                >
                  Update Address
                </button>
              )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
