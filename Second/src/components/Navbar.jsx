import React from 'react'
import hi from "../hi.mjs"
import PropTypes from 'prop-types'

function Navbar(props) {
  return (
    <>
    <div><h1>Who is the boss?</h1></div>
    <div><h1>{props.title}</h1></div>
    <div><h1>Who is the actor?</h1></div>
    <div><h1>{props.name}</h1></div>
    <div><h1>Who is the villain?</h1></div>
    <div><h1>{props.Villain}</h1></div>
    <div><h1>What is the film?</h1></div>
    <div><h1>{props.Film}</h1></div>

{hi.one}
<br/>
{hi.two}
<br/>
{hi.three}
<br/>
{hi.four}
</>
  )
}

// Prop type validation = Checking the type of props passed to the component. It helps in catching bugs and ensuring that the component receives the expected data types. In this case, we are specifying that the props title, name, Villain, and Film should all be strings. If a different type is passed, a warning will be shown in the console during development.

// npm install prop-types , then only validation works. It is a separate package that needs to be installed in order to use prop type validation in React components.


Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  Villain: PropTypes.string,
  Film: PropTypes.string
}

Navbar.defaultProps = {
  title: "Default Title",
  name: "Default Name",
  Villain: "Default Villain",
  Film: "Default Film",
};

export default Navbar;