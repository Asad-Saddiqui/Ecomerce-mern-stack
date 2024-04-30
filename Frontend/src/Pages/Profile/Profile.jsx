import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Profile = () => {
  // Profile data state variables
  const [firstName, setFirstName] = useState('Md');
  const [lastName, setLastName] = useState('Rimel');
  const [email, setEmail] = useState('rimel1111@gmail.com');
  const [address, setAddress] = useState('Kingston, 5236, United States');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Temporary state variables
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempCurrentPassword, setTempCurrentPassword] = useState('');
  const [tempNewPassword, setTempNewPassword] = useState('');
  const [tempConfirmNewPassword, setTempConfirmNewPassword] = useState('');

  // Handle Save Changes with Toast Notification
  const handleSaveChanges = () => {
    if (
      tempCurrentPassword === '' ||
      tempNewPassword === '' ||
      tempConfirmNewPassword === ''
    ) {
      toast.error('All password fields are required');
      return;
    }

    if (tempNewPassword !== tempConfirmNewPassword) {
      toast.error('New password and confirm new password must match');
      return;
    }

    // Update the actual profile data
    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setEmail(tempEmail);
    setAddress(tempAddress);
    setCurrentPassword(tempCurrentPassword);
    setNewPassword(tempNewPassword);
    setConfirmNewPassword(tempConfirmNewPassword);

    toast.success('Profile updated successfully!'); // Show success toast
  };

  return (
    <div>
      <Top />
      <Navbar />
      <div className="px-4 sm:px-6 md:px-8 lg:px-24 my-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-black opacity-50 font-normal">
          <span>Home</span>
          <div className="w-[13px] h-0 border-b border-black mx-2 transform rotate-[117.05deg]" />
          <span className="text-black">My Account</span>
        </div>

        {/* Welcome Message */}
        <div className="flex justify-between items-center my-4">
          <p className="text-black text-sm">Welcome!</p>
          <p className="text-red-500 text-sm">{`${firstName} ${lastName}`}</p>
        </div>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="flex flex-col w-1/3 pr-4">
            <h2 className="text-black text-xl font-semibold mb-4">Manage My Account</h2>

            <div className="flex flex-col gap-3">
              <span className="text-base font-medium text-red-500">My Profile</span>
              <span className="text-base font-medium">My Orders</span>
              <span className="text-base font-medium">My WishList</span>
              <span className="text-black opacity-50">Address Book</span>
              <span className="text-black opacity-50">My Payment Options</span>
              <span className="text-black opacity-50">My Returns</span>
              <span className="text-black opacity-50">My Cancellations</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-2/3 bg-white shadow p-6 rounded-lg">
            <h3 className="text-red-500 text-xl font-medium mb-6">Edit Your Profile</h3>

            <div className="grid gap-6">
              <div className="flex flex-col">
                <label className="text-black">First Name</label>
                <input
                  type="text"
                  className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  value={tempFirstName}
                  onChange={(e) => setTempFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label class="text-black">Last Name</label>
                <input
                  type="text"
                  className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  value={tempLastName}
                  onChange={(e) => setTempLastName(e.target.value)}
                />
              </div>

              <div class="flex flex-col">
                <label className="text-black">Email</label>
                <input
                  type="email"
                  className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black">Address</label>
                <input
                  type="text"
                  className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label class="text-black">Password Changes</label>
                <div className="flex flex-col gap-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    required
                    value={tempCurrentPassword}
                    onChange={(e) => setTempCurrentPassword(e.target.value)}
                    className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={tempNewPassword}
                    onChange={(e) => setTempNewPassword(e.target.value)}
                    className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    value={tempConfirmNewPassword}
                    onChange={(e) => setTempConfirmNewPassword(e.target.value)}
                    className="bg-neutral-100 p-2 rounded border-b-black border-b-[1px]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="text-black opacity-50">Cancel</button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded border-b-black border-b-[1px]"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
    </div>
  );
};

export default Profile;
