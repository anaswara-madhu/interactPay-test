import React, { Component } from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
import ListPaymentMethods from "./ListPaymentMethods";
import ChildComponent from "./ChildComponent";
class PaymentMethodList extends Component {
    constructor(props) {
        super(props);
        //this.onloadeddata = this.onloadeddata.bind(this);
        this.selectedPaymentMethod = this.selectedPaymentMethod.bind(this);
       //this.handleIsDelete = this.handleIsDelete.bind(this);
        console.log('constructor');
        this.state = {
            isDelete : false
             }
        this.state = {
          cardlist : false
         }
         this.count = 0;
    }
    // handleIsDelete() {
    //     console.log("invoked handleAddCard ------>");
    //     this.setState({
    //         isDelete : true
    //     })
    //   }
  
    selectedPaymentMethod(event) {
        //this.handleIsDelete();
        console.log('invoked selectedPaymentMethod on delete=====>')
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

//   onloadeddata() {
//   const queryParams = new URLSearchParams(window.location.search);
//   window.isContactExist = queryParams.get("isContactExist");
//   console.log(" window.isConatctExist==>" + window.isContactExist);
//   if ((window.isContactExist == "true")) {
//     window.newContact = false;
//   } else {
//     window.newContact = true;
//   }
//   console.log("window.isNewCard in onLOad  "+window.isNewCard);
//   if ((window.isNewCard == true)) {
//     console.log("window.isNewCard in if.  "+window.isNewCard);
//     window.shownewCard = true;
//   } else {
//     console.log("window.isNewCard in else.  "+window.isNewCard);
//     window.shownewCard = false;
//   }
//   fetch(
//     "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_KulGpoFcxMDRQy",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "https://api.stripe.com",
//         // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
//         Authorization:
//           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       //console.log("ListPaymentMethods--->" +JSON.stringify(response));
//       var cardList = response.data;
//       var paymentMethodList = [];
//       var jsonValues = JSON.parse(JSON.stringify(cardList));
//       var crd = new Object();
//       for (var i = 0; i < jsonValues.length; i++) {
//         crd = jsonValues[i].card;
//         crd.id = jsonValues[i].id;
//         crd.name = jsonValues[i].billing_details.name;
//         paymentMethodList.push(crd);
//       }
//       var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
//       window.paymentMethodId = defaultMethod;
//       for (var i = 0; i < paymentMethodList.length; i++) {
//         if (paymentMethodList[i].id == defaultMethod) {
//           paymentMethodList[i].isDefault = true;
//         } else {
//           paymentMethodList[i].isDefault = false;
//         }
//       }
//       console.log("default ===> " + JSON.stringify(paymentMethodList));
//       window.namesList = paymentMethodList.map(function (listValues, index) {
//         //console.log("window.namesList11-->" +namesList);
//         //console.log("------>namesList" +namesList);
//         return (
//           <li
//             class="list-group-item d-flex justify-content-between align-items-center"
//             data-id={listValues.id}
//             //onClick={selectedPaymentMethod}
//           >
//             <div data-id={listValues.id}>
//               <p
//                 class="text-uppercase mb-1"
//                 data-id={listValues.id}
//               >
//                 {listValues.brand} ****{listValues.last4}
//               </p>
//               <p
//                 class="text-black-50 mb-0"
//                 data-id={listValues.id}
//               >
//                 Expires on: {listValues.exp_month}/{listValues.exp_year}
//                 {listValues.isDefault ? (
//                   <span class="badge badge-pill badge-primary ml-4">
//                     Default
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </p>
//             </div>
//             <span>
//               <i class="fas fa-pencil-alt mr-3 text-dark"></i>
//               <i
//                 class="fas fa-trash-alt text-dark"
//                 data-id={listValues.id}
//                 //onClick={handleDelete}
//               ></i>
//             </span>
//           </li>
//         );
//       });
//       console.log("----!-->namesList-->" + window.namesList);
//       window.out = [];
//       window.out = window.namesList;
//       return window.namesList;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//     console.log("window.out-->" + window.out);
//     var newlist = window.out;
//     return newlist;
// }
// onloadeddata() {
//   fetch(
//     "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_KulGpoFcxMDRQy",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "https://api.stripe.com",
//         // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
//         Authorization:
//           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       //console.log("ListPaymentMethods--->" +JSON.stringify(response));
//       var cardList = response.data;
//       var paymentMethodList = [];
//       var jsonValues = JSON.parse(JSON.stringify(cardList));
//       var crd = new Object();
//       for (var i = 0; i < jsonValues.length; i++) {
//         crd = jsonValues[i].card;
//         crd.id = jsonValues[i].id;
//         crd.name = jsonValues[i].billing_details.name;
//         paymentMethodList.push(crd);
//       }
//       var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
//       window.paymentMethodId = defaultMethod;
//       for (var i = 0; i < paymentMethodList.length; i++) {
//         if (paymentMethodList[i].id == defaultMethod) {
//           paymentMethodList[i].isDefault = true;
//         } else {
//           paymentMethodList[i].isDefault = false;
//         }
//       }
//       console.log("default ===> " + JSON.stringify(paymentMethodList));
//       console.log("----!-->namesList-->" + window.namesList);
//       //window.out = [];
//       window.out = paymentMethodList;
//       return window.out;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//     console.log("window.out-->" + window.out);
//     var newlist = [];
//     var newlist = window.out;
//     console.log("return newlist-->" + newlist);
//     return newlist;
// }


render() {
  console.log("window.methodList --*8--> in 2nd child"+window.methodList);
  //  var payMethodlist = window.methodList;
  // if(payMethodlist=='[]'){
  //   this.count++;
  //   if(this.count==1){
  //      this.setState({
  //     cardlist: true,
  //   });
  // }
    
  // }
  // else{
  //   console.log("Patlist exists else ");
  // }
  //var list = this.onloadeddata();
  return (
    <div>
      < ListPaymentMethods />
      {/* {this.state.cardlist ? (
      <div>
      <h7 class = "ml-4"> No Payment Methods are availabe.</h7>
       </div>) : (
          ""
        )} */}
       </div>
     )
  }
}
  
   
  export default PaymentMethodList;