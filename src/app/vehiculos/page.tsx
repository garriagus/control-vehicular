import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { useSession } from "next-auth/react"

export default  function Page() {
  return (
    <h1>esta es una pagina protegida</h1>
    )
}