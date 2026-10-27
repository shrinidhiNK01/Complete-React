import Navbar from './components/Navbar'
import Textform from './components/TextForm'
function First(){
  return(
    <>
    <Navbar title="Shrinidhi is the boss 23" name="Shrinidhi" Villain="Sethupathi" Film = "Tamil" />
    {/* <Navbar /> */}
    <div className="container">
      <Textform title="Enter your Story" />
    </div>
    </>
  )
}

export default First;