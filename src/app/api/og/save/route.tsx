import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate data
    if (!data.title || !data.subtitle) {
      return NextResponse.json({ error: "Title and Subtitle are required" }, { status: 400 });
    }

    const configPath = path.join(process.cwd(), "src/config/og-settings.json");
    
    // Write to file
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("Failed to save OG settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
