import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);

    try {
        await writeFile(filePath, buffer);
        return NextResponse.json({
            url: `/uploads/${filename}`,
            success: 1,
            file: {
                url: `/uploads/${filename}`,
            }
        });
    } catch (error) {
        console.error("Error occurred ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
}
