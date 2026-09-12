import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, farmData } = await request.json();

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions:
        "You are Poultriva AI Farm Assistant. Give practical, clear poultry farming advice based on the farm data provided. Do not invent farm data.",
      input: `Farm data:
${JSON.stringify(farmData)}

Farmer question:
${message}`,
    });

    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI Assistant failed to respond." },
      { status: 500 }
    );
  }
}
