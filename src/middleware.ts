export { auth as middleware } from "@/auth"

export const config = {
    matcher: ["/organization/:path*", "/dashboard/:path*"],
}