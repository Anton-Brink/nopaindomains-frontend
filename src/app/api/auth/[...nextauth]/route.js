import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                newAccount: {"label": "newAccount?", "type": "checkbox"},
                name: { label: "Name", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error('Missing credentials')
                    throw new Error('Missing credentials')
                }

                try {
                    let res;
                    console.log("credentials: ", credentials)

                    if(credentials.newAccount === "true"){
                        res = await fetch("http://localhost:8000/api/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                                name: credentials.name
                            })
                        })
                    }else{
                        res = await fetch("http://localhost:8000/api/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password
                            })
                        })
                    }
                    console.log("res: ", res)


                    const data = await res.json()

                    console.log('Backend response:', {
                        status: res.status,
                        headers: Object.fromEntries(res.headers),
                        data
                    })

                    if (!res.ok) {
                        console.error('Backend error:', data)
                        throw new Error(data.message || 'Backend authentication failed')
                    }

                    if (!data.user || !data.token) {
                        console.error('Invalid response format:', data)
                        throw new Error('Invalid response format from backend')
                    }

                    const user = {
                        id: data.user.id || data.user._id,
                        name: data.user.email,
                        email: data.user.email,
                        accessToken: data.token
                    }

                    console.log('Authorized user:', user)
                    return user
                } catch (error) {
                    console.error('Authorization error:', error)
                    throw error // Let NextAuth handle the error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        }
    },
    pages: {
        signIn: '/login',
        error: '/login' // Redirect back to login on error
    },
    debug: true,
    session: {
        strategy: "jwt"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }