import { Link } from "react-router-dom"

export default () => {
  return (
      <div className="centered">
          <h3>About</h3>
          <br />
          <p>OTP is a game about submitting OTPs to a webpage really fast. This is an alpha version - v0.1 that is why some features may be fully baked. Despite of that I hope you will enjoy this little time waster game. Made with ❤️ by Ayushman</p>

            <br />

          <h3>For Awareness!!</h3>
          <br />
          <p>You should be very careful while submitting an OTP to a website. Make sure the connection is secure and make sure it is the correct website which is asking for the OTP. Checking the main domain and the "https" tag doesn't take long. Be safe in the internet</p>

            <br />

          <Link className="btn btn-green" to="/">Back to HOME</Link>
      </div>
  )  
}