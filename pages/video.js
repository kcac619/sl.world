import { useRouter } from "next/router";
import React from "react";

const Certificate = () => {
  const router = useRouter();
  let { slug } = router.query;
  slug = "login-video";
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div
              className="card-header"
              style={{
                color: "var(--main-color)",
                fontFamily: "outfit",
                textAlign: "center",
              }}
            >
              Product Video
            </div>
            <video
              src={`/vid/${slug}.mp4`}
              width="auto"
              autoPlay={true}
              height="600"
              style={{ marginBottom: "50px" }}
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
