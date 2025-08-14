import React from 'react';
import { assets } from '../../assets/assets.js';
import toast from 'react-hot-toast';

function Contribute() {
  const handleRazorpayPayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: 50000,
      currency: "INR",
      name: "Support My Blog",
      description: "Contribution",
      handler: function (response) {
        toast.success("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
      },
      theme: {
        color: "#4f46e5",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        
        
        <h1 className="text-3xl font-extrabold text-center text-white mb-4">
          Support My Blog ❤️
        </h1>
        <p className="text-center text-gray-300 mb-8 leading-relaxed">
          Enjoy my content? Help me keep creating by making a small contribution. 
          Every bit of support keeps the blog alive and ad-free! 🌟
        </p>

       
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-gray-700 rounded-2xl shadow-sm border border-gray-600">
            <img 
              src={assets.qr_code} 
              alt="UPI QR" 
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6">
          Scan with Paytm, Google Pay, PhonePe, or any UPI app
        </p>

        
        

        
        <p className="mt-6 text-xs text-center text-gray-500">
          Every contribution helps me keep this blog alive and ad-free 💙
        </p>
      </div>
    </div>
  );
}

export default Contribute;
