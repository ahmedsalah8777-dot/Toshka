export async function onRequest(context) {
  const url = new URL(context.request.url);
  const tableName = url.searchParams.get("table");

  if (!tableName) return Response.json({ error: "No table specified" });

  try {
    const { results } = await context.env.DB.prepare(`SELECT * FROM "${tableName}"`).all();
    return Response.json(results);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
