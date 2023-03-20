import prismaClient from "@/app/lib/prisma"


interface CreateTaskFields {
  title: string
  userUid: string
  description?: string
}

export async function POST(request: Request) {
  
  const {
    title, description
  } = await request.json().then(body => body as CreateTaskFields);

  const userUid = request.headers.get('useruid')

  if(title && userUid){
    const taskCreated = await prismaClient.tasks.create({
      data: {
        title: title,
        description: description,
        userUid: userUid
      }
    })
    return new Response(JSON.stringify(taskCreated), {
      status: 200
    })
  }
  
  const errorMessage = {
    error: {
      title: "Failed",
      description: "Task don't created"
    }
  }
  return new Response(JSON.stringify(errorMessage), {
    status: 500
  })
}



