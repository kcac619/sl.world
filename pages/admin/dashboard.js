// pages/admin/dashboard.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || session.user.role !== "admin") {
      // Redirect to login or unauthorized page
      router.push("/auth/login");
    }
  }, [session, router]);

  //  admin dashboard content
  return (
    <div>
      <h1>ADMIN Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
