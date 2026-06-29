"use server";

import { headers } from "next/headers";
import { auth, db } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: role,
    },
    headers: await headers(),
  });

  revalidatePath("/dashboard/admin/users");

  return data;
};


export const updateUserProfile = async (data) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) return { error: true, message: "Not authenticated" };
 
    await db.collection("user").updateOne(
      { _id: userId },
      {
        $set: {
          name: data.name,
          image: data.image,
          skills: data.skills,
          bio: data.bio,
          hourlyRate: Number(data.hourlyRate),
          updatedAt: new Date(),
        },
      }
    );
 
    return { success: true };
  } catch (err) {
    return { error: true, message: err.message };
  }
};
 