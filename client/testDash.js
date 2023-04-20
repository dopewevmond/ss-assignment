import jwtDecode from "jwt-decode";

const payload = jwtDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjF9LCJwYXJhbXMiOnt9LCJleHAiOjE2ODE5ODAwNjksImlhdCI6MTY4MTg5Njk3Nn0.x87qx_-vUHbpZXpsHFCt8Zuvh6Dsn2GveofeuU1iT0w')

const d = new Date(payload.exp)

// console.log(d.getFullYear())

const date = new Date(1681980069 * 1000)
console.log(date.getFullYear())