import react,{useState} from 'react'

function Textform(props){
    // UseState is a React hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update that state. In this case, we are using useState to manage the text input value in the Textform component.

    // Event Handling
    // ==================
    const  handleOnChange = (event) => {
        console.log("On change")
        setText(event.target.value) //listen the event and set the value of text to the value of the event.target.value
    }

    const handleOnClick = () => {
        console.log("UpperCase was clicked" + text)
        let newText = text.toUpperCase();
        setText(newText)
    }
    const handleOnClick2 = () => {
        console.log("LowerCase was clicked" + text)
        let newText = text.toLowerCase();
        setText(newText)
    }

    const [text,setText] =useState('Enter text here Shrinidhi Bro')
    // text = "Enter text here Shrinidhi Bro" // Wrong way to change the state 
    // setText("Enter text here Shrinidhi Bro") // Correct way to change the state

    // text = what was before 
    // setText = what is after

    // 1. text is the current state value, which holds the text input value.
    // 2. setText is a function that allows you to update the state value. When you call setText with a new value, React will re-render the component with the updated state.

    return(
        <>
    <div>
        <h1>{props.title}</h1>
        <label htmlFor="text" className="form-label">Enter text</label>
         <textarea className="form-control" value = {text} onChange={handleOnChange} id="text" rows="9" />

    </div>
            <div className="container my-3 " >
            <button className="btn btn-primary mx-3" onClick={handleOnClick}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-3" onClick={handleOnClick2}>Convert to Lowercase</button>
            </div>

            <div className="container">
              <h2>Your Text Summary</h2>
              <p>{text.length} characters</p>
              <p>{text.split(" ").length} words</p>
              <p>{0.08 * text.split(" ").length} minutes to read</p>
              <h2>Preview</h2>
              <p>{text}</p>

            </div>

          </>
        )
      }

export default Textform;