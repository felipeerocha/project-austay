function saveToken(token: string) {
    try {
        localStorage.setItem('authToken', token)
    } catch (error) {
        console.error("Error saving token:", error)
    }
}

export const AuthStorage = Object.freeze({
    saveToken,
})