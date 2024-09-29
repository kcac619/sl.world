"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountCard from "../components/AccountCard";

const MyAccount = () => {
  console.log("jwtDecode: ", jwtDecode);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log("Decoded Token:", decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontSize: "1.2em",
          color: "#333",
        }}
      >
        Please{" "}
        <Link
          href="/auth/login"
          style={{ textDecoration: "underline", color: "#007bff" }}
        >
          login
        </Link>{" "}
        to access your account.
      </div>
    );
  }

  return (
    <div className="account">
      <Head>
        <title>My Account</title>
        {/* ... [Your meta tags] ... */}
      </Head>

      <div className="container">
        <div className="pb-50">
          <div id="account-account" className="container acpage">
            {/* ... [Your Breadcrumb JSX - adapt links with Link component] ... */}

            <div className="row">
              <div
                id="content"
                className="col-sm-12 col-md-9 col-lg-9 col-xs-12 colright"
              >
                <div className="acco">
                  {/* User Information Section (Separate Row) */}
                  <div className="row mb-4">
                    {" "}
                    {/* Added a new row for user info */}
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header">
                          <h2 className="achead">My Account</h2>
                        </div>
                        <div className="card-body">
                          {/* Welcome Message  */}
                          <p style={{ fontSize: "2rem" }}>
                            Hello, {user?.firstName} {user?.lastName}!
                          </p>
                          <p>Email: {user?.email}</p>
                          {/* ... [Add other user info if needed] ... */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings Section */}
                  <h2 className="achead">Account Settings</h2>
                  <div className="row accrow">
                    {/* ... Now use the AccountCard component ... */}
                    <AccountCard
                      icon="/image/catalog/account/user.svg"
                      title="Edit your account information"
                      description="edit your account"
                      link="/account/edit"
                    />
                    <AccountCard
                      icon="/image/catalog/account/lock.svg"
                      title="Change your password"
                      description="Change Your Password"
                      link="/account/password"
                    />
                    <AccountCard
                      icon="/image/catalog/account/route.svg"
                      title="Modify your address book entries"
                      description="Edit your address"
                      link="/account/address"
                    />
                    {/* <AccountCard
                      icon="/image/catalog/account/keyboard.svg"
                      title="Subscribe / unsubscribe to newsletter"
                      description="subscribe for newsletter"
                      link="/account/newsletter"
                    /> */}
                    <AccountCard
                      icon="/image/catalog/account/box.svg"
                      title="View your order history"
                      description="See your order history"
                      link="/account/order"
                    />
                    {/* <AccountCard
                      icon="/image/catalog/account/download.svg"
                      title="Downloads"
                      description="Download Your Theme"
                      link="/account/download"
                    /> */}
                    {/* <AccountCard
                      icon="/image/catalog/account/star.svg"
                      title="Your Reward Points"
                      description="Count Reward Point"
                      link="/account/reward"
                    /> */}
                    {/* <AccountCard
                      icon="/image/catalog/account/insert.svg"
                      title="View your return requests"
                      description="See your Return"
                      link="/account/return"
                    /> */}
                    {/* <AccountCard
                      icon="/image/catalog/account/cabinet.svg"
                      title="Your Transactions"
                      description="See your Transaction"
                      link="/account/transaction"
                    /> */}
                    {/* <AccountCard
                      icon="/image/catalog/account/recurring.svg"
                      title="Recurring payments"
                      description="See your Payment"
                      link="/account/recurring"
                    /> */}

                    {/* ... [Add more AccountCard components as needed] ... */}
                  </div>
                </div>
              </div>

              {/* Aside Section */}
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
                  {/* <Link href="/account/download" className="list-group-item">
                    Downloads
                  </Link>
                  <Link href="/account/returns" className="list-group-item">
                    Returns
                  </Link>{" "}
                  <Link href="/account/transaction" className="list-group-item">
                    Transactions
                  </Link> */}
                  <hr />
                  {/* <h3>
                    <svg className="" width="20px" height="20px">
                      <use xlinkHref="#aclufolder" />
                    </svg>
                    MY STUFF
                  </h3>
                  <Link href="/account/wishlist" className="list-group-item">
                    Wish List
                  </Link>
                  <Link href="/account/reward" className="list-group-item">
                    Reward Points
                  </Link>
                  <Link href="/account/newsletter" className="list-group-item">
                    Newsletter
                  </Link> */}
                  <hr />
                  <h3 className="acl">
                    <svg className="" width="20px" height="20px">
                      <use xlinkHref="#aclogout" />
                    </svg>
                    <Link
                      href=""
                      onClick={handleLogout}
                      className="list-group-item logu"
                    >
                      Logout
                    </Link>
                  </h3>
                </div>
              </aside>
              {/* ... [Column Right JSX - adapt links using Link component] ...  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
