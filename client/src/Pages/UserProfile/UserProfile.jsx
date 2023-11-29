import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import s1 from '../../League/s1.png'
import s2 from '../../League/s2.png'
import s3 from '../../League/s3.png'
import s4 from '../../League/s4.png'
import "./UsersProfile.css";
import { subscription } from "../../actions/users";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const [Subscribe, setSubscribe] = useState(false);
  const [Plan,setPlan] = useState(null)
  const pay = (e)=>{
    e.preventDefault();
    let amount;
    if(Plan === 1) amount = 100
    if(Plan === 2) amount = 1000
    if(Plan === 0){
      alert("Subrcibed To Free Plan");
      dispatch(subscription(currentUser?.result?._id,0))
      }else{
        var options = {
          key: "rzp_test_CXdwbcglCWoYWZ",
          key_secret:"Vm3yvjsvO40AMjQSNdSSyypv",
          amount: amount *100,
          currency:"INR",
          name:"STARTUP_PROJECTS",
          description:"for testing purpose",
          handler: function(response){
            if(Plan === 1 ) {
              alert("Payment Successfull Subscribed To Silver Plan");
              dispatch(subscription(currentUser?.result?._id,1))
            }
            if(Plan === 2 ) {
              alert("Payment Successfull Subscribed To Gold Plan");
              dispatch(subscription(currentUser?.result?._id,2))
            }
          },
          prefill: {
            name:"A Pradeep",
            email:"pradeep123kaiscf@gmail.com",
            contact:"6374603162"
          },
          notes:{
            address:"Razorpay Corporate office"
          },
          theme: {
            color:"#3399cc"
          }
        };
        var pay = new window.Razorpay(options);
        pay.open();
      }
  }

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2" >
        <section >
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            <div>
              <div>
                {
                  currentProfile?.point >= 0 && currentProfile?.point < 50
                    ? (
                      <>
                        <img src={s1} alt="" style={{ width: '75px', height: '75px', marginBottom: '3px',}} />
                        <h5 style={{marginBottom: '10px', textAlign:'center',fontSize:'12px'}}>Beginner</h5>
                      </>
                    )
                    : currentProfile?.point >= 50 && currentProfile?.point < 100
                    ? (
                      <>
                        <img src={s2} alt="" style={{ width: '75px', height: '75px', marginBottom: '3px', marginLeft:'50px'}} />
                        <h5 style={{marginBottom: '10px', textAlign:'center',fontSize:'12px'}}>Intermediate</h5>
                      </>
                    )
                    : currentProfile?.point >= 100 && currentProfile?.point < 150
                    ? (
                      <>
                        <img src={s3} alt="" style={{ width: '75px', height: '75px', marginBottom: '3px', marginLeft:'50px'}} />
                        <h5 style={{marginBottom: '10px', textAlign:'center',fontSize:'12px'}}>Expert</h5>
                      </>
                    )
                    : currentProfile?.point >= 150 && currentProfile?.point < 200
                    ? (
                      <>
                        <img src={s4} alt="" style={{ width: '75px', height: '75px', marginBottom: '3px', marginLeft:'50px'}} />
                        <h5 style={{marginBottom: '10px', textAlign:'center',fontSize:'12px'}}>Professional</h5>
                      </>
                    )
                    : null
                }
              </div>
              {currentUser?.result._id === id && (
                <div>
                  <button className="edit-profile-btn" onClick={() => setSubscribe(!Subscribe)}>Subscribe</button>
                  <button
                    type="button"
                    onClick={() => setSwitch(true)}
                    className="edit-profile-btn"
                  >
                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                  </button>
                </div>
            )}
            </div>
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
          <>
              {Subscribe?(
                <div style={{display:'flex',flexDirection:'column',}}>
                  <h1>Available Subscribtions</h1>
                  <div style={{display:'flex',flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
                  <label style={{border: '2px solid #ccc',marginRight:'20px',borderRadius:'5px',paddingLeft:'5px',backgroundColor:'#F8F8FF', borderColor:(Plan === 0)?'#1E90FF':'black'}} onClick={()=>(setPlan(0))}>
                      <h3 style={{textAlign:'center'}}>Free Plan</h3>
                      <div style={{height:'3px',backgroundColor:'grey',marginRight:'5px'}}></div>
                      <h4>Features</h4>
                      <ul>
                        <li>
                          Max 1 questions per day
                        </li>
                        <li>
                          Response from other beginners
                        </li>
                        <li>
                          Amount: free
                        </li>
                      </ul>
                    </label>
                    <label style={{border: '2px solid #ccc',marginRight:'20px',borderRadius:'5px',paddingLeft:'5px',paddingRight:'5px',backgroundColor:'#F8F8FF', borderColor:(Plan === 1)?'#1E90FF':'black'}} onClick={()=>(setPlan(1))}>
                      <h3 style={{textAlign:'center'}}>Silver Plan</h3>
                      <div style={{height:'3px',backgroundColor:'grey',marginRight:'5px'}}></div>
                      <h4>Features</h4>
                      <ul>
                        <li>
                          Max 5 questions per day
                        </li>
                        <li>
                          Quick Response
                        </li>
                        <li>
                          Amount: Rs.100/month
                        </li>
                      </ul>
                    </label>
                    <label style={{border: '2px solid #ccc',marginRight:'20px',borderRadius:'5px',paddingLeft:'5px',backgroundColor:'#F8F8FF', borderColor:(Plan === 2)?'#1E90FF':'black'}} onClick={()=>(setPlan(2))}>
                      <h3 style={{textAlign:'center'}}>Gold Plan</h3>
                      <div style={{height:'3px',backgroundColor:'grey',marginRight:'5px'}}></div>
                      <h4>Features</h4>
                      <ul>
                        <li>
                          Unlimited questions per day
                        </li>
                        <li>
                          Quick Response from Professionals
                        </li>
                        <li>
                          Amount: Rs.1000/month
                        </li>
                      </ul>
                    </label>
                  </div>
                  <button className="user-submit-btn" style={{width:'100px',marginTop:'10px'}} onClick={pay}>Pay Now</button>
                </div>
              ):(<></>)}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
