const BACKEND_URL = "https://script.google.com/macros/s/xxxxxxxxxxxx/exec";  // رابطك الصحيح

document.getElementById("appointment-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const day      = document.getElementById("day").value;
  const period   = document.querySelector('input[name="period"]:checked')?.value || "";

  if (!fullName || !phone || !day || !period) {
    alert("يرجى ملء جميع الحقول المطلوبة (*) بشكل صحيح");
    return;
  }

  // استخدم URLSearchParams → يرسل كـ form-urlencoded (simple request → لا preflight)
  const params = new URLSearchParams();
  params.append("fullName", fullName);
  params.append("phone", phone);
  params.append("day", day);
  params.append("period", period);

  try {
    await fetch(BACKEND_URL, {
      method: "POST",
      body: params,  // هذا يجعل Content-Type تلقائي form-urlencoded
      redirect: "follow"  // مهم لـ Apps Script
    });

    // إذا وصل هنا → الطلب نجح (لا نستطيع قراءة رد JSON دائمًا، لكن البيانات توصل)
    alert("تم حجز الموعد بنجاح! سيتم التواصل معك قريباً.");
    this.reset();

  } catch (err) {
    console.error("Fetch error:", err);
    alert("حدث خطأ أثناء الإرسال. تأكد من الإنترنت أو جرب مرة أخرى.");
  }
});
