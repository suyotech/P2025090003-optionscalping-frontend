export const validEmailAndPassword = (email:string, password:string)=>{
    const errors:{email?:string; password?:string}={};


    // email validation
    const gmailRegex= /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if(!email){
        errors.email="Eamil is equired";
    }else if(!gmailRegex.test(email)){
        errors.email="please Enter the valid gmail address.";
    }

    // password validation
    if(!password){
        errors.password="Password is Required";
    }else if( password.length<=6){
errors.password="Password must be 6 characters";
    }

    return errors;
};

//  New: Mobile Number Validation (for Karigars / Clients)
export const validateMobile = (mobile: string) => {
  const errors: { mobile?: string } = {};
  const mobileRegex = /^[0-9]{10}$/;

  if (!mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!mobileRegex.test(mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits.";
  }

  return errors;
};