// app/api/uploadToPinata/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/config/pinata";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // First upload the image
    const imageResult = await pinata.upload
      .file(file)
      .key(process.env.PINATA_JWT!);

    // Create and upload metadata
    const metadata = JSON.stringify({
      name,
      description,
      image: `ipfs://${imageResult.IpfsHash}`,
      attributes: [
        {
          trait_type: "Type",
          value: "NOFA",
        },
      ],
    });

    // Create a Blob from the metadata
    const metadataBlob = new Blob([metadata], { type: "application/json" });
    const metadataFile = new File([metadataBlob], "metadata.json", {
      type: "application/json",
    });

    // Upload metadata as a file
    const metadataResult = await pinata.upload
      .file(metadataFile)
      .key(process.env.PINATA_JWT!);

    return NextResponse.json({
      success: true,
      ipfsHash: imageResult.IpfsHash,
      metadataHash: metadataResult.IpfsHash,
      pinSize: imageResult.PinSize,
      timestamp: imageResult.Timestamp,
    });
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return NextResponse.json(
      { error: "Failed to upload to IPFS" },
      { status: 500 }
    );
  }
}
