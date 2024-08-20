import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Debugging: Output file details
    console.log("File received:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Process the file here (e.g., save to disk, cloud storage, etc.)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    );
  }
}
