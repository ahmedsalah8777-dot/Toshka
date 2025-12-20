export async function onRequest(context) {
  // 1. نقرأ اسم الجدول من رابط الطلب
  const url = new URL(context.request.url);
  const tableName = url.searchParams.get("table");

  // إذا لم يتم إرسال اسم جدول، نعرض رسالة خطأ
  if (!tableName) {
    return Response.json({ error: "الرجاء تحديد اسم الجدول" });
  }

  try {
    // 2. نجلب البيانات من الجدول المطلوب (بحد أقصى 100 صف لتجنب البطء)
    // لاحظ: وضعنا علامات التنصيص حول الاسم لحماية الاستعلام
    const stmt = context.env.DB.prepare(`SELECT * FROM "${tableName}" LIMIT 100`);
    const { results } = await stmt.all();
    return Response.json(results);
  } catch (err) {
    return Response.json({ error: "خطأ في جلب البيانات: " + err.message }, { status: 500 });
  }
}
