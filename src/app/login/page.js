'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mode,setMode] = useState('login')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const result = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                newAccount: mode === 'register',
                name: formData.get('name'),
                redirect: false
            })

            if (result?.error) {
                setError('Invalid email or password')
            } else {
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            setError('An error occurred')
        } finally {
            setLoading(false)
        }
    }
    const toggleMode = () => {
        if(mode === 'login')
        {
            setMode('register')
        }else{
            setMode('login')
        }
    }


    if(mode === 'login')
    {
        return (
            <div className="max-w-md mx-auto mt-8 p-6">
                <h1 className="text-2xl mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 bg-blue-500 text-white rounded"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                <p className="mt-4">
                    <button onClick={toggleMode}>No account yet?</button>
                </p>
            </div>
        )
    }else if(mode === 'register'){
        return (
            <div className="max-w-md mx-auto mt-8 p-6">
                <h1 className="text-2xl mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 bg-blue-500 text-white rounded"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                <p className="mt-4">
                    <button onClick={toggleMode}>Already have an account?</button>
                </p>
            </div>
        )
    }
}