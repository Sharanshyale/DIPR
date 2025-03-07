import React from "react";
import {
      LeftSection,
      Logo,  
    } from "../Logowithtitle/Logowithtitle.styles";
import logo from "../../assets/Logo.png"; 

const Logowithtitle = () => {
      return (
           <LeftSection>
            <Logo src={logo} alt="Government of Karnataka Logo" />
                    <h2>Department of <br /> Information and Public <br /> Relations</h2>
                    <p>Government of Karnataka</p>
           </LeftSection>
      );
};

export default Logowithtitle;
