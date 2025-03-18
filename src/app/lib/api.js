export const api = async (url, options) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const session = await getSession()

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    }

    if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    return fetch(`${baseUrl}/api${url}`, {
        ...options,
        headers,
    })
}