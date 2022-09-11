import accounts from '../accounts.json'

class AuthService {
    login(login, password) {
        return new Promise((resolve, reject) => {
            const user = accounts.find(acc => acc.login === login && acc.password === password)

            if (user) {
                localStorage.setItem('auth', user)
                return {
                    code: 0,
                    object: user
                }
            }

            return {
                code: 404
            }
        })
    }
}