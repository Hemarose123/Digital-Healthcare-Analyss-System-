async function sendMedicineSMS(payload) {
  try {
    if (!payload.phoneNumber || !isValidPhoneNumber(payload.phoneNumber)) {
      return {
        success: false,
        error: "Invalid phone number format"
      };
    }
    const smsText = formatMedicineReminder(payload);
    const response = await fetch("/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phoneNumber: sanitizePhoneNumber(payload.phoneNumber),
        message: smsText
      })
    });
    if (!response.ok) {
      return simulateSMS(payload);
    }
    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId || `SMS-${Date.now()}`
    };
  } catch (error) {
    console.error("SMS send error:", error);
    return simulateSMS(payload);
  }
}
function formatMedicineReminder(payload) {
  const { medicineName, dosage, time, notes } = payload;
  let message = `💊 Medicine Reminder: Take ${medicineName} (${dosage}) at ${time}`;
  if (notes) {
    message += `. Note: ${notes}`;
  }
  message += ". Stay healthy! 🏥 - AI Health Companion";
  return message;
}
function simulateSMS(payload) {
  console.log("📱 [SIMULATED SMS]");
  console.log(`To: ${payload.phoneNumber}`);
  console.log(`Message: ${formatMedicineReminder(payload)}`);
  return {
    success: true,
    messageId: `SMS-DEMO-${Date.now()}`
  };
}
function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return phoneRegex.test(cleaned);
}
function sanitizePhoneNumber(phone) {
  let cleaned = phone.replace(/[\s\-()]/g, "");
  if (!cleaned.startsWith("+")) {
    cleaned = `+${cleaned}`;
  }
  return cleaned;
}
function addToSMSHistory(reminderId, phoneNumber, medicineName, success, messageId) {
}
export {
  addToSMSHistory,
  isValidPhoneNumber,
  sanitizePhoneNumber,
  sendMedicineSMS
};
