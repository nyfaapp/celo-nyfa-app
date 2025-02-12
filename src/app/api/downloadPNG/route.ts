export async function POST(req: Request) {
  const { filename, data } = await req.json();

  // Remove the data URL prefix to get just the base64 data
  const base64Data = data.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  // Set appropriate headers for direct download
  const headers = new Headers();
  headers.set("Content-Type", "application/octet-stream");
  headers.set("Content-Disposition", `attachment; filename="${filename}"`);

  return new Response(buffer, {
    headers,
  });
}
