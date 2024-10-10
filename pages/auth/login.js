// pages/auth/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      }); // No need to send 'remember'

      console.log("Login response:", response);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Check if the token is present in the response
        if (response.data.token) {
          // Store the JWT token in localStorage
          localStorage.setItem("token", response.data.token);
          console.log("Token set in localStorage:", response.data.token);
        } else {
          console.error("Token not found in response");
          setError("Token not found in response");
          return;
        }

        router.push("/account");
      } else {
        console.error("Login Error:", response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div>
      <Head>
        <title>Account Login</title>
        {/* ... [Your meta tags] ...  */}
      </Head>

      <div className="container">
        <div className="pb-50">
          <div id="account-login" className="container acpage">
            {/* ... [Breadcrumb JSX - adapt links with Link components] ...  */}
            <div className="d-flex justify-content-between align-items-center back-page">
              <div className="">
                <div className="back-to-home">
                  <Link href="/">
                    <img src="/img/back-to-home.svg" alt="Back to home" />  {" "}
                    <span> Back to category</span>
                  </Link>
                </div>
              </div>
              <div className="">
                <ul className="breadcrumb ">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="fas fa-home"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/account">Account</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/auth/login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              {/* New Customer Section */}
              

              {/* Returning Customer Section */}
              <div className="col-sm-4">
                <div className="card mb-3">
                  <div className="card-body">
                    {/* Login Form */}
                    <form id="form-login" onSubmit={handleSubmit}>
                      <h1>Returning Customer</h1>
                      <p>
                        <strong>I am a returning customer</strong>
                      </p>
                      {/* Error Alert */}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <div className="mb-3">
                        <label htmlFor="input-email" className="col-form-label">
                          E-Mail Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-Mail Address"
                          id="input-email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="input-password"
                          className="col-form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          id="input-password"
                          className="form-control"
                          required
                        />
                        <Link href="/auth/forgot-password">
                          Forgotten Password
                        </Link>
                      </div>
                      {/* Remember Me Checkbox */}
                      {/* <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          id="remember"
                          className="form-check-input"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember Me
                        </label>
                      </div> */}

                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <h1>New Customer</h1>
                    <p>
                      <strong>Register Account</strong>
                    </p>
                    <p>
                      By creating an account you will be able to shop faster, be
                      up to date on an order's status, and keep track of the
                      orders you have previously made.
                    </p>
                    <Link href="/auth/register" className="btn btn-primary">
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
              <aside
              id="column-right"
              className="col-lg-3 col-md-3 d-none d-md-block"
            >
              <div className="list-group accolumn">
                <h3>
                  <svg className="" width="20px" height="20px">
                    {" "}
                    <use xlinkHref="#acluser" />{" "}
                  </svg>
                  ACCOUNT SETTINGS
                </h3>
                <Link href="/auth/login" className="list-group-item">
                  Login
                </Link>{" "}
                <Link href="/auth/register" className="list-group-item">
                  Register
                </Link>{" "}
                <Link href="/auth/forgot-password" className="list-group-item">
                  Forgotten Password
                </Link>
                <Link href="/account" className="list-group-item">
                  My Account
                </Link>
                <Link href="/account/address" className="list-group-item">
                  Address Book
                </Link>
                <hr />
                <h3>
                  <svg className="" width="20px" height="20px">
                    {" "}
                    <use xlinkHref="#aclorder" />{" "}
                  </svg>
                  MY ORDERS{" "}
                </h3>
                <Link href="/account/order" className="list-group-item">
                  Order History
                </Link>{" "}
                <Link href="/account/download" className="list-group-item">
                  Downloads
                </Link>
                <Link href="/account/returns" className="list-group-item">
                  Returns
                </Link>{" "}
                <Link href="/account/transaction" className="list-group-item">
                  Transactions
                </Link>
               
              </div>
            </aside>
              
            </div>

            {/* Column Right */}
          
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
