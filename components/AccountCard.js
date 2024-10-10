// components/AccountCard.js
import Link from "next/link";

const AccountCard = ({ icon, title, description, link }) => {
  return (
    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <Link href={link}>
        <span>
          <img src={icon} alt={title} />
        </span>
        <span>
          {title}
          <br />
          <span>{description}</span>
        </span>
      </Link>
    </div>
  );
};

export default AccountCard;
