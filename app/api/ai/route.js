export const runtime = "nodejs";

export async function GET() {
  return new Response("API ALIVE", {
    status: 200,
    headers: { "Content-Type": "text/plain" }
  });
}
