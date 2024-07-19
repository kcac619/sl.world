// pages/user/dashboard.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserDashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || session.user.role !== "user") {
      // Check for 'user' role
      // Redirect to login or unauthorized page
      router.push("/auth/login");
    }
  }, [session, router]);

  // ... Your user dashboard content ...
  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
};

export default UserDashboard;
