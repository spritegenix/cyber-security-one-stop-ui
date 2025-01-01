class Env {
    static BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL as string;
    static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
    static BASE_GQL_URL: string = process.env.NEXT_PUBLIC_BASE_GQL_URL as string;
    static CHAT_API_URL: string = process.env.NEXT_PUBLIC_CHAT_API_URL as string;
}

export default Env;