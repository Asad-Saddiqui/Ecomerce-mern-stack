import React, { useState } from 'react';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Contact = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Display the toast when form is submitted successfully
    setIsToastVisible(true);

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  return (
    <div>
      {isToastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Message sent successfully!
        </div>
      )}

      <Top />
      <Navbar />
      
      <div className="px-4 sm:px-6 md:px-8 lg:px-24 my-10">
        {/* Breadcrumb Section */}
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2 text-sm opacity-50 text-black">
            <li>Home</li>
            <li className="w-4 h-0.5 bg-black transform rotate-[117deg]" />
            <li className="text-black">Contact</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* "Call to Us" and "Write to Us" Sections */}
          <div className="flex-1 bg-white rounded shadow p-6 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 p-2.5 bg-red-500 rounded-full" />
                <h2 className="text-black text-base font-medium">Call To Us</h2>
              </div>
              <p className="text-black text-sm">We are available 24/7, 7 days a week.</p>
              <p className="text-black text-sm">Phone: +8801611112222</p>
            </div>

            <div className="w-[270px] h-[0px] opacity-50 border-b border-black" />

            <div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 p-2.5 bg-red-500 rounded-full" />
                <h2 className="text-black text-base font-medium">Write To Us</h2>
              </div>
              <p className="text-black text-sm">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-black text-sm">Emails: customer@exclusive.com</p>
              <p className="text-black text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-red-500 text-lg font-semibold">Contact Us</h2>
            
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-black">Your Name <span className="text-red-500">*</span></label>
                <input type="text" className="p-2 bg-neutral-100 rounded border-b-black border-b-[1px]" required />
              </div>

              <div className="flex flex-col">
                <label class="text-black">Your Email <span class="text-red-500">*</span></label>
                <input type="email" className="p-2 bg-neutral-100 rounded border-b-black border-b-[1px]" required />
              </div>

              <div className="flex flex-col">
                <label class="text-black">Your Phone <span class="text-red-500">*</span></label>
                <input type="tel" className="p-2 bg-neutral-100 rounded border-b-black border-b-[1px] " required />
              </div>

              <div className="flex flex-col">
                <label className="text-black">Your Message</label>
                <textarea className="p-2 bg-neutral-100 rounded border-b-black border-b-[1px]" rows="5"></textarea>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-red-500 text-white rounded">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
