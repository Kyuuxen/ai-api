export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      envKeyExists: !!process.env.GEMINI_API_KEY
    }),
    { status: 200 }
  );
}
