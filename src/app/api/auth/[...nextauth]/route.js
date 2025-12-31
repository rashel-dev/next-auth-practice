import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const users = [
    {
        id: 1,
        name: "John",
        email: "john.doe@example.com",
        password: "password123"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password456"
    },
    {
        id: 3,
        name: "John sin",
        email: "john.sin@gmail.com",
        password: "password123"
    },
    {
        id: 4,
        name: "John sina",
        email: "john.sina@gmail.com",
        password: "password123"
    },
]

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Email & Password',
    
    //form inputs
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
      secretCode: { label: "Secret Code", type: "number", placeholder: "enter your secret code" },
    },
    async authorize(credentials, req) {
    
        const { username, password, secretCode } = credentials;
        const user = users.find((user) => user.name === username);
        if (!user) {
            throw new Error("No user found");
        }
        const isPasswordMatched = user.password === password;
        if(isPasswordMatched){
          return user;
        }

      return null;
    }
  })
    
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }