import ResetPassword from "@/admin/containers/settings/ResetPassword";
import AdminBaseLayout from "@/admin/layout/AdminBaseLayout";

const ResetPasswordPage = () => {
  return (
    <AdminBaseLayout title="Reset Password">
      <ResetPassword />;
    </AdminBaseLayout>
  );
};

export default ResetPasswordPage;
