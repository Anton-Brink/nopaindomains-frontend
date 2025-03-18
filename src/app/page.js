import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from "next/link"
import DomainSearch from './components/DomainSearch'

export default async function Page() {
    const session = await getServerSession(authOptions)
      if (!session) {
        return (
            <div>
              <h1 className="text-center">Something went wrong, please <Link href="login">Login</Link> again</h1>
            </div>
        )
      } else if (session.user.name !== "" && session.hasOwnProperty("accessToken")) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-neutral-300 text-4xl text m-5 font-bold">No Pain Domains</h1>
              <DomainSearch token={session.accessToken} />
            </div>
        )
      } else {
        return (
            <div>
              <h1>Welcome, not sure what went wrong with your account, please <Link href="login">Login</Link> and try again</h1>
            </div>
        )
      }
}