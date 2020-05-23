import React from 'react';
class App extends React.Component {
   constructor() {
      super();
      this.state = {
         firstName:"",
         lastName:"",
         email:"",
         password:"",
         isWarning:0,
         alertMsg:"",

      }
   }
   formUpdater(e,idx){      
      if(idx == 'firstName' || idx == 'lastName'){
         e.target.value	=   e.target.value.replace(new RegExp("[0-9]"), "");
      }else if(idx == 'password'){
         e.target.value	=   e.target.value.split(/[^a-zA-Z0-9 ]/).join('');
      }
      switch(idx){
         case 'firstName':
            this.setState({firstName:e.target.value});
         break;
         case 'lastName':
            this.setState({lastName:e.target.value});
         break;
         case 'email':
            this.setState({email:e.target.value});
         break;
         case 'password':
            this.setState({password:e.target.value});
         break;
      }
      this.closeAlert();
  }
  validateEmail(str) {
    var urlRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig;
      var pattern = new RegExp(urlRegEx);
      if(!pattern.test(str)) {
           return 0;
      } else {
       return 1;
      }
  }
  formSubmit(){
      if(this.state.firstName .trim() == "") {
         this.setState({isWarning:1,alertMsg:"Please enter First name",alertClass:"alertFail"});
         return false;  
      }
      if(this.state.lastName .trim() == "") {
         this.setState({isWarning:1,alertMsg:"Please enter Last name",alertClass:"alertFail"});
         return false;  
      }	
      if(this.state.email .trim() == "") {
         this.setState({isWarning:1,alertMsg:"Please enter Email address",alertClass:"alertFail"});
         return false;  
      }
      if(this.validateEmail(this.state.email) == 0) {
         this.setState({isWarning:1,alertMsg:"Please enter valid Email address",alertClass:"alertFail"   });
         return false;	
      }
      if(this.state.password.trim() == "") {
         this.setState({isWarning:1,alertMsg:"Please enter password",alertClass:"alertFail"});
         return false;  
      }
      if(this.state.password.length < 8) {
         this.setState({isWarning:1,alertMsg:"Password must be atlest 8 characters",alertClass:"alertFail"});
         return false;  
      }
      this.setState({isWarning:1,alertMsg:"Successfully claimed your free trial",alertClass:"alertSucess"});
   }
   closeAlert(param){
      if(param == 'terms'){
         this.setState({isWarning:2,alertMsg:" Terms and Services",alertClass:"alertTerms"});
         return false
      }
      this.setState({isWarning:0,alertMsg:"",alertClass:""});
      return false;  
   }

   render() {
      return (
         <div className="login">
            <div>
            <h1>Get started today!</h1>
            </div>
            <div className ="gridView">
               <div className = "inputBox" >
                  <label className="lableLeft">
                     <span className="lableSpan">First name</span><br></br>
                     <input className = "newinput_left" type="text" value ={this.state.firstName} onChange={(e)=>this.formUpdater(e,'firstName')}/>
                  </label>
               </div>
               <div className = "inputBox" >
                  <label className="lableRight">
                     <span className="lableSpan">Last name</span><br></br>
                     <input className = "newinput_right" type="text" value ={this.state.lastName} onChange={(e)=>this.formUpdater(e,'lastName')}/>
                  </label>
               </div>
            </div>
            <div className ="gridView">
               <div className = "inputBox">
                  <label className="lableLeft">
                     <span className="lableSpan">Email address</span><br></br>
                     <input className = "newinput_left" type="text" value ={this.state.email} onChange={(e)=>this.formUpdater(e,'email')}/>
                  </label>
               </div>
               <div className = "inputBox">
                  <label className="lableRight">
                  <span className="lableSpan">Password</span><br></br>
                     <input className = "newinput_right" type="password" value ={this.state.password} onChange={(e)=>this.formUpdater(e,'password')}/>
                  </label>
               </div>
            </div>
            <hr className ="lineBreak"></hr>
            <div className ="gridButton">
               <button className="freeTrial" value="Login" onClick={()=>this.formSubmit()}> Claim Your Free Trial </button><div className ="triangle-right"></div>
            </div>
            <div className="loginHelp">
                <p className="agree">You are agreeing to our <a href="javascript:void(0)" className="terms" onClick={()=>this.closeAlert("terms")}>Terms and Services</a></p>
            </div>
            {this.state.isWarning == 1 &&
               <div className={this.state.alertClass}>
                  <span className="closebtn" onClick={()=>this.closeAlert("")}>&times;</span> 
                  <strong>{(this.state.alertClass == "alertSucess")?"Success":"Error"}!</strong> {this.state.alertMsg}.
               </div> 
            }
            {this.state.isWarning == 2 &&
               <div className={this.state.alertClass}>
                  <span className="closebtn" onClick={()=>this.closeAlert("")}>&times;</span> 
                  {this.state.alertMsg}.
               </div> 
            }
         </div>
      );
   }
}

export default App;
