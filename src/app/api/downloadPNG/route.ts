import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error in downloadPNG route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}