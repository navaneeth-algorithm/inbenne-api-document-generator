import React from "react";
import Button from 'react-bootstrap/Button'
class CustomButton extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
      <div>
          <Button variant="success">{this.props.buttonName}</Button>
      </div>
        );
    }
}



export default CustomButton;