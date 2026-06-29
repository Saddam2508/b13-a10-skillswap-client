
import EditProfileForm from "@/components/freelancer/profile/EditProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <EditProfileForm user={user} />
    </div>
  );
}