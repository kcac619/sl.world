import React, { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(0); // Default to not subscribed
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
        // Send newsletter preference
      });

      if (response.status === 201) {
        // Registration successful - redirect to login page
        router.push("/auth/login");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <Head>
        <title>Register Account</title>
        {/* ... [Add other meta tags] ... */}
      </Head>

      <div className="container">
        <div className="pb-50">
          <div id="account-register" className="container">
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
                    <Link href="/auth/register">Register</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div id="content" className="col">
                <h1>Register Account</h1>
                <p>
                  If you already have an account with us, please login at the{" "}
                  <Link href="/auth/login">login page</Link>.
                </p>

                {/* Error Alert  */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form id="form-register" onSubmit={handleSubmit}>
                  {/* Your Personal Details */}
                  <fieldset id="account">
                    <legend>Your Personal Details</legend>
                    <div className="row mb-3 required">
                      <label
                        htmlFor="input-firstname"
                        className="col-sm-2 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          id="input-firstname"
                          className="form-control"
                          required
                        />
                        <div
                          id="error-firstname"
                          className="invalid-feedback"
                        ></div>
                      </div>
                    </div>
                    <div className="row mb-3 required">
                      <label
                        htmlFor="input-lastname"
                        className="col-sm-2 col-form-label"
                      >
                        Last Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          id="input-lastname"
                          className="form-control"
                          required
                        />
                        <div
                          id="error-lastname"
                          className="invalid-feedback"
                        ></div>
                      </div>
                    </div>
                    <div className="row mb-3 required">
                      <label
                        htmlFor="input-email"
                        className="col-sm-2 col-form-label"
                      >
                        E-Mail
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-Mail"
                          id="input-email"
                          className="form-control"
                          required
                        />
                        <div
                          id="error-email"
                          className="invalid-feedback"
                        ></div>
                      </div>
                    </div>
                  </fieldset>

                  {/* Your Password */}
                  <fieldset>
                    <legend>Your Password</legend>
                    <div className="row mb-3 required">
                      <label
                        htmlFor="input-password"
                        className="col-sm-2 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col-sm-10">
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
                        <div
                          id="error-password"
                          className="invalid-feedback"
                        ></div>
                      </div>
                    </div>
                    <div className="row mb-3 required">
                      <label
                        htmlFor="input-confirm"
                        className="col-sm-2 col-form-label"
                      >
                        Confirm Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          name="confirm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          id="input-confirm"
                          className="form-control"
                          required
                        />
                        <div
                          id="error-confirm"
                          className="invalid-feedback"
                        ></div>
                      </div>
                    </div>
                  </fieldset>

                  {/* Newsletter */}
                  <fieldset>
                    <legend>Newsletter</legend>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Subscribe
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="newsletter"
                            value="1"
                            id="input-newsletter-yes"
                            className="form-check-input"
                            checked={newsletter === 1}
                            onChange={(e) => setNewsletter(1)}
                          />
                          <label
                            htmlFor="input-newsletter-yes"
                            className="form-check-label"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="newsletter"
                            value="0"
                            id="input-newsletter-no"
                            className="form-check-input"
                            checked={newsletter === 0}
                            onChange={(e) => setNewsletter(0)}
                          />
                          <label
                            htmlFor="input-newsletter-no"
                            className="form-check-label"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <div className="d-inline-block pt-2 pd-2 w-100">
                    <div className="float-end text-right">
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          I have read and agree to the{" "}
                          <Link href="/privacy-policy" className="modal-link">
                            <b>Privacy Policy</b>
                          </Link>
                        </label>{" "}
                        <input
                          type="checkbox"
                          name="agree"
                          value="1"
                          checked={agreeToPrivacy}
                          onChange={(e) => setAgreeToPrivacy(e.target.checked)}
                          className="form-check-input"
                          required
                        />
                      </div>
                      {agreeToPrivacy ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={!agreeToPrivacy}
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary">
                          <i className="fa fa-ban"></i> &nbsp; &nbsp; Continue
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Column Right */}
              <aside
                id="column-right"
                className="col-lg-3 col-md-3 d-none d-md-block"
              >
                <div className="list-group accolumn">
                  <h3>
                    <svg className="" width="20px" height="20px">
                      <use xlinkHref="#acluser" />
                    </svg>
                    ACCOUNT SETTINGS
                  </h3>
                  <Link href="/auth/login" className="list-group-item">
                    Login
                  </Link>{" "}
                  <Link href="/auth/register" className="list-group-item">
                    Register
                  </Link>{" "}
                  <Link
                    href="/auth/forgot-password"
                    className="list-group-item"
                  >
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
                      <use xlinkHref="#aclorder" />
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
