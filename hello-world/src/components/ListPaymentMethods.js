import React, { Component,useState,useEffect } from 'react';
import "./ListPaymentMethods.css";
import $ from 'jquery';
import Popper from 'popper.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class ListPaymentMethods extends Component {
    constructor(props) {
        super(props);
        this.onloadeddata = this.onloadeddata.bind(this);
        this.onloadAchFetch = this.onloadAchFetch.bind(this);
        this.handleIsDelete = this.handleIsDelete.bind(this);
        this.selectedPaymentMethod = this.selectedPaymentMethod.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deletePaymentMethod = this.deletePaymentMethod.bind(this);
        this.notification = this.notification.bind(this);
        this.state = {isDelete : false}
        this.state = {
          items: []
      };
    }
componentDidMount() {
console.log("Hiiiiii")
this.onloadeddata();
this.onloadAchFetch();
} 
selectedPaymentMethod(event) {
    console.log('invoked selectedPaymentMethod =====>');
    console.log("Invooked Method" + event.target.getAttribute("data-id"));
    window.paymentMethodId = event.target.getAttribute("data-id");
    this.x = window.paymentMethodId;
    var acc = document.querySelectorAll(".list-group-item");
     for (let i = 0; i < acc.length; i++) {
       if (acc[i].classList.contains("activeList")) {
          acc[i].classList.remove("activeList");
         }
       }
       let _listItems = event.target;
        _listItems.classList.add("activeList");
       
}
 onloadeddata () {
   console.log("invoke onload");
   const queryParams = new URLSearchParams(window.location.search);
    this.custId = queryParams.get("customerId");
    if(this.custId){
      this.customerId = this.custId;
    }
    else{
      this.customerId = window.custId;
    }
   console.log("this.customerId in onloadxx---> "+this.customerId);
  //  if(this.customerId){
     fetch(
      "https://api.stripe.com/v1/payment_methods?type=card&customer="+this.customerId,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "https://api.stripe.com",
            // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
            Authorization: "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
           },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            //console.log("ListPaymentMethods--->" +JSON.stringify(response));
            var cardList = response.data;
            var paymentMethodList = [];
            var jsonValues = JSON.parse(JSON.stringify(cardList));
            var crd = new Object();
            for (var i = 0; i < jsonValues.length; i++) {
              crd = jsonValues[i].card;
              crd.id = jsonValues[i].id;
              crd.name = jsonValues[i].billing_details.name;
              paymentMethodList.push(crd);
            }
            var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
            window.paymentMethodId = defaultMethod;
            for (var i = 0; i < paymentMethodList.length; i++) {
              if (paymentMethodList[i].id == defaultMethod) {
                paymentMethodList[i].isDefault = true;
              } else {
                paymentMethodList[i].isDefault = false;
              }
            }
            console.log("default ===> " + JSON.stringify(paymentMethodList));
           // console.log("----->namesList-->" + window.namesList);
          //   window.methodList =  JSON.stringify(paymentMethodList);
          //   window.out = paymentMethodList;
          //  return window.out;
          // this.methodList =  JSON.stringify(paymentMethodList);
        //   console.log("before changes--------------------------------------------")
           this.out = paymentMethodList;
           console.log("this.outMount-->"+this.out)
             this.setState({
              items: this.out
          });
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
onloadAchFetch(){
   //---------------------------------------------------------------------------------------------------------------------------
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
            console.log('ach list--------------'+JSON.stringify(achList))
          })
        
          .catch((err) => {
            console.log(err);
          });

  

//-------------------------------------------------------------------------------------------------------------------------

}
handleIsDelete() {
   console.log("invoked handleIsDelete ");
    this.setState({
       isDelete : true
     })
}
closeDeleteModal(){
  console.log("Invoked close popup")
  this.setState({
    isDelete: false,
});
}
deletePaymentMethod(event){
  console.log("invoked deletePaymentMethod")
  //this.x = event.target.getAttribute("data-id");
  this.payMethodId = this.x;
  console.log(" delete id *******===>"+this.payMethodId)
  var deleteUrl = "https://api.stripe.com/v1/payment_methods/" + this.payMethodId + "/detach";
  console.log("deleteUrl==>"+deleteUrl)
    fetch(deleteUrl,
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
        console.log(" delete response -->" + JSON.stringify(response));
        var message = " Card Deleted";
        var type = "success";
          this.notification(message,type);
          this.onloadeddata();
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
          this.notification(message,type);
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
     
render() {
  var list = this.state.items;
  console.log('listnew####--->'+JSON.stringify(list));
   //var listValues;
      return ( 
      //   window.namesList = list.map((listValues, index) => (
      //     <div>
      //            <ul class="list-group  list-group-flush listDetails border">
      //                <li
      //           class="d-flex justify-content-between align-items-center listDetails list-group-item"
      //           data-id={listValues.id} name= "livalue"
      //          onClick={event => this.selectedPaymentMethod(event)}
      //         >
      //           <div data-id={listValues.id}>
      //             <p
      //               class="text-uppercase mb-1"
      //               data-id={listValues.id}
      //             >
      //               {listValues.brand} ****{listValues.last4}
      //             </p>
      //             <p
      //               class="text-black-50 mb-0"
      //               data-id={listValues.id}
      //             >
      //               Expires on: {listValues.exp_month}/{listValues.exp_year}
      //               {listValues.isDefault ? (
      //                 <span class="badge badge-pill badge-primary ml-4">
      //                   Default
      //                 </span>
      //               ) : (
      //                 ""
      //               )}
      //             </p>
      //           </div>
      //           <span>
      //             <i class="fas fa-pencil-alt mr-3 text-dark"></i>
      //             <i
      //               class="fas fa-trash-alt text-dark"
      //               data-id={listValues.id}
      //               onClick={() => this.accessChild()}
      //               //onClick={() => this.handleIsDelete()}
      //               //onClick = {this.handleIsDelete()}
      //               //onClick={() => this.handleIsDelete()}
      //             ></i>
      //           </span>
      //         </li>
      //         </ul> 

      //         </div> 
           
      //     )
          
          
      // )

      <div>
      {list ? (
        this.namesList = list.map((listValues, index) => (
          <div>
                 <ul class="list-group  list-group-flush listDetails border">
                     <li
                class="d-flex justify-content-between align-items-center listDetails list-group-item"
                data-id={listValues.id} name= "livalue"
               onClick={event => this.selectedPaymentMethod(event)}
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
                    Expires on: {listValues.exp_month}/{listValues.exp_year}
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
        {this.state.isDelete ? (
                    <div className="popup-box">
                    <div className="deletePopup">
                      <span className="close-icon">x</span>
                        <h5 class="border-bottom mb-4 text-center">
                        Delete PaymentMethod.
                        </h5>
                        <p  class="border-bottom pb-4 text-center">Are you sure you want to delete this card?</p>
                        <div>
                          <button class="btn btn-outline-primary float-right"
                          onClick={() => this.closeDeleteModal()}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button class="btn btn-primary float-right mr-3"
                          //onClick={() => this.deletePaymentMethod()}
                          onClick={event => this.deletePaymentMethod(event)}
                          >Delete</button>
                        </div>
                    </div>
                  </div>
                ) : (
                 ""
                )}
       </div>
  )
      }
}
export default ListPaymentMethods;