import prismaClient from "@/app/lib/prisma"


interface CreateTaskFields {
  id: string
  done: boolean
}

export async function PATCH(request: Request) {
  const {
    id, done
  } = await request.json().then(body => body as CreateTaskFields);

  if(id){
    const taskFound = await prismaClient.tasks.update({
      where: { id: id },
      data: { done },
    })
    return new Response(JSON.stringify(taskFound), {
      status: 200
    })
  }
  
  const errorMessage = {
    error: {
      title: "Failed",
      description: "Task don't change done"
    }
  }
  return new Response(JSON.stringify(errorMessage), {
    status: 500
  })
}



