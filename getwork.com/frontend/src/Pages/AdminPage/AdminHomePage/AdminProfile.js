import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminProfile } from "../../../actions/adminActions";
import Spinner from 'react-bootstrap/Spinner';
import { PieChart } from "react-minimal-pie-chart";
import "./AdminProfile.scss";
import { changePassword } from "../../../actions/UserAction";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const Profile = useSelector((state) => state.adminProfile);
  const password = useSelector(state => state.changePasswords);

  console.log(password);

  const [oldPass, setOldPass] = useState('');
  const [confirm, setConfirm] = useState('');

  console.log(Profile?.data);
  console.log(user);
  let escrowSum = 0

  const inEscrow = Profile?.data?.adminData?.adminData?.inEscrow?.map((el) => {
    return escrowSum = escrowSum + el?.inEscrow
  })
  
  console.log(escrowSum);


  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }

    dispatch(adminProfile());
  }, [user]);

  return (
    <div className="adminProfile">
      <div className="leftt">
        <div className="top">
          <h3>Welcome back</h3>
        </div>

        <div className="bottom">
          <p>
            Employees:{" "}
            <strong>
              {" "}
              {Profile?.data?.emplyerLength ? Profile?.data?.emplyeeLength : ""}
            </strong>
          </p>
          <p>
            Employers:{" "}
            <strong>
              {Profile?.data?.emplyerLength ? Profile?.data?.emplyerLength : ""}
            </strong>{" "}
          </p>
          <p>
          Total jobs: 
            <strong>
            {Profile?.data?.jobsLength ? Profile?.data?.jobsLength : ""}
            </strong>
          </p>
        </div>
      </div>

      <div className="right">
        <div className="top">
          <div className="l-box">
            <h3>TOTAL EARNING</h3>
            <strong>₹  { Profile?.data?.adminData?.adminData?.balance}</strong>
          </div>

          <div className="l-box">
            <h3>CONNECTS SOLD</h3>
            <strong>{ Profile?.data?.adminData?.adminData?.soldConnect}</strong>
          </div>

          <div className="l-box">
            <h3 style={{ color: "#3ccf4e" }}>In Escrow</h3>
            <strong>₹ {escrowSum}</strong>
          </div>
        </div>

        <div className="bottom">
          <input type="text" disabled placeholder={user?.userInfo?.email} />
         
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch(changePassword(oldPass, confirm))
          }} >
          <div>
            <input type="password" onChange={(e) => setOldPass(e.target.value)} required placeholder="Old Password" />
{password?.loading ?  <CustomSpinner /> : ''}
            <input type="password" onChange={(e) => setConfirm(e.target.value)} required placeholder="New Password" />
          </div>
          
    {password?.message ?<p className="mt-3" >{ password?.message }</p> : ''}
          <button className="ch-ps-bt" >Update Password</button>
          </form>
       
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
