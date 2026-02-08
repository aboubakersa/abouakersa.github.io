// ضع هنا الرابط الذي نسخته من Apps Script
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbwbqxb1TpjlVn0FRJaRlBrEovo9YOmMTO5WIFy1qxX3AFpdKYiVthcKOSXJBQoL2Mht/exec";

document.getElementById("appointment-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  // جمع البيانات
  const formData = {
    fullName: document.getElementById("full-name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    day: document.getElementById("day").value,
    period: document.querySelector('input[name="period"]:checked')?.value || "",
    // notes: ""   ← يمكنك إضافة حقل ملاحظات لاحقًا
  };

  // التحقق من التعبئة
  if (!formData.fullName || !formData.phone || !formData.day || !formData.period) {
    alert("يرجى ملء جميع الحقول المطلوبة (*) بشكل صحيح");
    return;
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert("تم حجز الموعد بنجاح!\nسنتواصل معك في أقرب وقت.");
      this.reset(); // إفراغ النموذج
    } else {
      alert("حدث خطأ أثناء الحجز:\n" + result.message);
    }
  } catch (err) {
    alert("مشكلة في الاتصال بالخادم.\nتأكد من الإنترنت وحاول مرة أخرى.");
    console.error(err);
  }
});;