import getAuthInstance from "@/lib/better-auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handle = async (request) => {
  const auth = await getAuthInstance();
  return auth.handler(request);
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
