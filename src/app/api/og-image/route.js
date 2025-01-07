import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full text-center h-full items-center justify-center bg-white">
        <h1 tw="text-5xl">Cyber Security</h1>
        <p tw="text-3xl">One Stop Solution</p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}

// https://og-playground.vercel.app/
