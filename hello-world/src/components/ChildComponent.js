import React, { Component } from 'react';
class ChildComponent extends Component {
    constructor(props) {
        super(props);
        //this.onloadeddata = this.onloadeddata.bind(this);
        this.handleIsDelete = this.handleIsDelete.bind(this);
        this.state = {
            isDelete : false
             }
    }
    handleIsDelete() {
        console.log("invoked handleIsDelete is child ------>");
        this.setState({
            isDelete : true
        })
      }
      render() {
          return(
              <div>
                 {this.state.isDelete ? (
                      "hello"
                      ) : (
                        ""
                       )}
              </div>
          )
      }
}
export default ChildComponent;