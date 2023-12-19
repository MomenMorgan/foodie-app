import React from "react";
import Foot from "../../assets/images/Foot.png";
import logo5 from "../../assets/images/foodie-logo-zip-file/png/logo5.png";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black mt-20 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <img src={logo5} alt="Logo" className="w-32 h-auto" />
          <p className="text-white mt-4 text-sm font-light">© 2023 FoodieApp</p>
        </div>
        <div className="text-center text-white">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul>
            <li className="mb-2">Recipes</li>
            <li className="mb-2">Categories</li>
            <li className="mb-2">About Us</li>
            <li className="mb-2">Contact</li>
          </ul>
        </div>
        <div className="text-center text-white">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center">
            <a href="#" className="mr-4">
              <i className="fab fa-facebook-square text-white text-xl"></i>
            </a>
            <a href="#" className="mr-4">
              <i className="fab fa-twitter-square text-white text-xl"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram-square text-white text-xl"></i>
            </a>
          </div>
        </div>
        <div className="text-center text-white">
          <h4 className="text-lg font-semibold mb-2">Subscribe</h4>
          <p>Subscribe to our newsletter for updates on new recipes!</p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="border-2 border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
            />
            <button className="bg-white text-black py-2 px-4 rounded-md ml-2 hover:bg-gray-200 focus:outline-none">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}