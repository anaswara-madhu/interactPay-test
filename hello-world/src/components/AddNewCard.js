import React  from 'react';

function AddNewCard({closeModal}) {
    return(
        <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={() => closeModal(false)}>x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center">Please enter your card details.</h5>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label>Card Number</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>Name on the card</label>
                    <input class="form-control" id="inputPassword4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>Expiry</label>
                    <input type=" " class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>CVV</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                </div>
                  <div>
                  <button class="btn btn-outline-primary float-right">
                    Cancel
                  </button>
                  <button class="btn btn-primary float-right mr-3">Save</button>
                  </div>
              </form>
            </div>
          </div>
    );

}
export default AddNewCard;