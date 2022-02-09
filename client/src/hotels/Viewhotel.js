import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { read, diffDays } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";


const Viewhotel =() =>{
    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate =useNavigate();
    
    const { user } = useSelector((state) => ({ ...state }));
    const { hotelId } = useParams();
    useEffect(() => {
      loadSellerHotel();
    }, []);

    const loadSellerHotel = async () => {
       // console.log(hotelId);
        let res = await read(hotelId);
        setHotel(res.data );
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
      };

      const handleClick = async (e) => {

        e.preventDefault();
        setLoading(true);
        if (!user) navigate("/login");
       // console.log(user.token,hotelId);
        let res = await getSessionId(user.token, hotelId); 
        //console.log("get sessionid resposne", res.data.sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };
      
      
 return(
 <>
 <div className="container-fluid bg-secondary p-3 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
         
          
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">€{hotel.price}</p>
            <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                </span>
        </p>
        <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              
              onClick={handleClick} className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading}> 
               {loading
                ? "Loading..."
                : user && user.token
                ? "Book Now"
                : "Login to Book"}
              </button>
              
            
            </div>
          </div>
          </div>
    </>
  );
};

 export default Viewhotel; 