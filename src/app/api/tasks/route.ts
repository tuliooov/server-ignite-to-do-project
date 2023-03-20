export const fetchCache = 'no-store'
export const revalidate = true

import prismaClient from "@/app/lib/prisma";

export const config = {
  api: {
      bodyParser: false,
  },
};

export async function GET(request: Request) {
  const userUid = request.headers.get('useruid')
  if(userUid){
    const response = await prismaClient.tasks.findMany({
      where: { userUid: userUid },
    })
    return new Response(JSON.stringify(response), {
      status: 200,
    })
  }
  const errorMessage = {
    error: {
      title: "Failed",
      description: "User don't found"
    }
  }
  return new Response(JSON.stringify(errorMessage), {
    status: 500
  })
  
}