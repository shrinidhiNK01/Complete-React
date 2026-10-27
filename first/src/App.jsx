import React from "react";
import "./App.css";

let name = "Shrinidhi"
let ambition = "I want to become a Prime Minister of India"

function First() {
  return (
    <>
    <h1>hello world</h1>
    <div className="first"><h1>Hello Everybody I am {name}</h1></div>
    <p>{ambition}</p>

    <nav>
      <ul>
        <li>Home</li>
        <li>Address</li>
        <li>Contact</li>
      </ul>
    </nav>  

    <img src="" alt="image" />

    <div className="snk">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, tenetur! Autem eum maiores quis! Maxime hic distinctio consectetur quidem. Consectetur blanditiis iste et distinctio, cum exercitationem eum doloremque. Nulla, recusandae.
    </div>
    </>
  );
}
export default First;