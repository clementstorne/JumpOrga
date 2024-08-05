import prisma from "@lib/prisma";

export const getOrganizerData = async (userId: string) => {
  const organizer = await prisma.organizer.findUnique({
    where: {
      userId: userId,
    },
  });
  return organizer;
};
