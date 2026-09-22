import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, farmData } = await request.json();

    const text = String(message || "").toLowerCase();

    const currentBirds = Number(farmData?.currentBirds || 0);
    const mortality = Number(farmData?.mortality || 0);
    const eggs = Number(farmData?.eggs || 0);
    const expenses = Number(farmData?.expenses || 0);
    const sales = Number(farmData?.sales || 0);

    let answer = "";

    if (text.includes("feed") || text.includes("abinci")) {
      const dailyFeedKg = currentBirds * 0.12;
      const weeklyFeedKg = dailyFeedKg * 7;

      answer =
        `Based on your current flock of ${currentBirds} birds, ` +
        `a basic planning estimate is about ${dailyFeedKg.toFixed(1)} kg of feed per day ` +
        `or ${weeklyFeedKg.toFixed(1)} kg per week. ` +
        `Actual feed requirement depends on bird age, breed, weather and production stage.`;
    } else if (
      text.includes("mortality") ||
      text.includes("death") ||
      text.includes("mutuwa")
    ) {
      answer =
        `Your recorded mortality is ${mortality} birds. ` +
        `Monitor the flock closely, provide clean water and good ventilation, ` +
        `and investigate any sudden increase in mortality.`;
    } else if (
      text.includes("egg") ||
      text.includes("production") ||
      text.includes("kwai")
    ) {
      answer =
        `Your farm has recorded ${eggs} eggs. ` +
        `Track daily egg production so you can quickly identify a decline in production.`;
    } else if (
      text.includes("profit") ||
      text.includes("loss") ||
      text.includes("riba")
    ) {
      const profit = sales - expenses;

      answer =
        `Your recorded sales are ₦${sales.toLocaleString()} and expenses are ₦${expenses.toLocaleString()}. ` +
        `Your current estimated net result is ₦${profit.toLocaleString()}.`;
    } else if (
      text.includes("flock") ||
      text.includes("birds") ||
      text.includes("kaji")
    ) {
      answer =
        `Your current flock has ${currentBirds} birds, with ${mortality} mortality recorded ` +
        `and ${eggs} eggs recorded.`;
    } else if (
      text.includes("kula") ||
      text.includes("care") ||
      text.includes("manage") ||
      text.includes("kulawa") ||
      text.includes("abin da zan kula")
    ) {
      answer =
        `For your flock, focus on clean drinking water, adequate feed, good ventilation, ` +
        `proper hygiene, vaccination and disease prevention, temperature control, ` +
        `daily mortality monitoring, and regular egg production records. ` +
        `Also watch for changes in feed intake, water consumption, bird activity, ` +
        `and signs of illness.`;
    } else {
      answer =
        `I can help you with feed planning, flock management, mortality, egg production, ` +
        `and basic profit/loss analysis. Please ask a question about your farm.`;
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI Assistant failed to respond." },
      { status: 500 }
    );
  }
}
