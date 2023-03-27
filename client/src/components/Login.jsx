import React from "react";
import axios from "axios";
import {  VALIDATOR_EMAIL,VALIDATOR_EXACT } from "../Controllers/UserValidator";
import { useForm } from "../Controllers/useFormhook";
import {Button ,Card} from "@material-ui/core";
import Input from "../Controllers/Input";
import { useHistory } from "react-router-dom";
import Header from "./header";



const Login=(props)=>{
    const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
  

  const history=useHistory();

 


  const [formState, inputHandler] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = (event) => {
        

      event.preventDefault();
      

      
       
    }

    const apicall=()=>{
      const url = `${window.location.origin}/api/login/`;
        axios.post(url+"userExist", {Email: formState.inputs.Email.value,
        Password: formState.inputs.Password.value
  }).then((res) => {
          if(res.data.message=="Login Successfull"){
            history.push("/home");
            

          }
          else{
            alert(res.data.message);
          }
          
            
          });
        
    }
    return (
      <>
      <Header darkMode={props.darkMode}
      toggleTheme={() =>props.toggleTheme()}/>
      <center>
        <Card className="authentication" style={{ backgroundColor: "#D1D7E0",width:"50%",height:"70%" ,marginTop:"20%"}}>
      
        <h2
          style={{
            backgroundColor: "#2D283E",
            margin: "0",
            color: "#D1D7E0",
            padding: "10px",
          }}
        >
          Login Required
        </h2>
        
        <hr style={{ backgroundColor: "#333996", margin: "0" }} />
        
          
        

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#D1D7E0",padding:"3%" }}>
    
    
          <Input
            element="input"
            id="Email"
            type="Email"
            label="Email"
            validators={[VALIDATOR_EMAIL(10)]}
            errorText="Please enter a valid Email with minimum 10 characters."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="Password"
            type="Password"
            label="Password"
            validators={[VALIDATOR_EXACT(9)]}
            errorText="Please enter a valid Password with 9 digits."
            onInput={inputHandler}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#2D283E",color:"white" }}
            type="submit"
            disabled={!formState.isValid}
            sx={{ marginTop: "10px" }}
            onClick={apicall}
          >
            SUBMIT
          </Button>

      </form>
      </Card>
      </center>
      </>
    )
}

export default Login;

 
