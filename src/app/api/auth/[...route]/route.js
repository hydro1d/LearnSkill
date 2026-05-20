import getAuthInstance from "@/lib/better-auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handle = async (request) => {
  try {
    const auth = await getAuthInstance();
    return await auth.handler(request);
  } catch (error) {
    console.error("Auth handler error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || String(error),
        stack: error.stack,
        env: {
          MONGODB_URI: process.env.MONGODB_URI ? "present" : "missing",
          MONGODB_DB: process.env.MONGODB_DB ? "present" : "missing",
          BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "present" : "missing",
          BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ? "present" : "missing",
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? "present" : "missing"
        }
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}

export async function PUT(request) {
  return handle(request);
}

export async function PATCH(request) {
  return handle(request);
}

export async function DELETE(request) {
  return handle(request);
}

export async function OPTIONS(request) {
  return handle(request);
}
