import { useRouter } from "next/router";
import React from "react";

const Certificate = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug,"8778787")

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div
              className="card-header"
              style={{
                color: "#20C997",
                fontFamily: "outfit",
                textAlign: "center",
              }}
            >
              Product Certificate (PDF)
            </div>
            <object
              className="pdf"
              data={`/pdf/${slug}.pdf`}
              width="auto"
              height="600"
              style={{ marginBottom: "50px" }}
            ></object>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;


