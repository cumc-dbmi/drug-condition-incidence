import {NextResponse} from "next/server";

export async function GET() {
  const response = await fetch('http://localhost/api/incidence/drug');
  return NextResponse.json(response);
}