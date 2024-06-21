import React, { useState, useEffect} from 'react';
import SummaryApi from '../common';

const PersonalInformation = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    originpassword:'',
    profilePic: ''
  });

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const dataResponse = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include'
        });

        const dataApi = await dataResponse.json();

        setData(dataApi.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <label>Avatar:</label>
      <img src={data.profilePic} alt="Profile" />
      <br />
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
      />
      <br />
      <label>Email:{data.email}</label>

      <br />
      <label>Password: </label>
      <input
        type="text"
        name="password"
        value={data.originpassword}
        onChange={handleChange}
      />
      
    </div>
  );
};

export default PersonalInformation;
