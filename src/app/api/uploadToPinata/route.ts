// app/api/uploadToPinata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pinata } from '@/config/pinata';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const result = await pinata.upload.file(file).key(process.env.PINATA_JWT!);

    return NextResponse.json({
      success: true,
      ipfsHash: result.IpfsHash,
      pinSize: result.PinSize,
      timestamp: result.Timestamp,
    });
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return NextResponse.json(
      { error: 'Failed to upload to IPFS' },
      { status: 500 }
    );
  }
}