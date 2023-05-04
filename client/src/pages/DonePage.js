import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DonePage = () => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate("/");
   };

   return (
      <div className="text-center">
         <h1 className=" my-5">User registration successful!</h1>
         <Button onClick={handleClick} className="w-25 my-5">
            Go to new form
         </Button>
      </div>
   );
};

export default DonePage;
