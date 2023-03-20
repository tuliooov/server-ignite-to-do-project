import prismaClient from "@/app/lib/prisma"

export async function DELETE(request: Request) {

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if(id){
    const taskFound = await prismaClient.tasks.delete({
      where: { id: id },
    })
    return new Response(JSON.stringify(taskFound), {
      status: 200
    })
  }
  
  const errorMessage = {
    error: {
      title: "Failed",
      description: "Task don't delete task"
    }
  }
  return new Response(JSON.stringify(errorMessage), {
    status: 500
  })
}



