/**
 * SMS Service - Handles sending medicine reminders via SMS
 * Uses Twilio API for production, fallback for demo
 */

export interface SMSPayload {
  phoneNumber: string;
  medicineName: string;
  dosage: string;
  time: string;
  notes?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an SMS reminder for a medicine
 */
export async function sendMedicineSMS(
  payload: SMSPayload,
): Promise<SMSResponse> {
  try {
    // Validate phone number
    if (!payload.phoneNumber || !isValidPhoneNumber(payload.phoneNumber)) {
      return {
        success: false,
        error: "Invalid phone number format",
      };
    }

    // Format the SMS message
    const smsText = formatMedicineReminder(payload);

    // Try to send via backend API
    const response = await fetch("/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: sanitizePhoneNumber(payload.phoneNumber),
        message: smsText,
      }),
    });

    if (!response.ok) {
      // Fallback: simulate SMS for demo
      return simulateSMS(payload);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId || `SMS-${Date.now()}`,
    };
  } catch (error) {
    console.error("SMS send error:", error);
    // Graceful fallback for demo
    return simulateSMS(payload);
  }
}

/**
 * Send bulk SMS reminders for the day
 */
export async function sendBulkMedicineSMS(
  reminders: SMSPayload[],
): Promise<SMSResponse[]> {
  return Promise.all(reminders.map(sendMedicineSMS));
}

/**
 * Schedule SMS reminder for a specific time
 */
export function scheduleReminderSMS(
  payload: SMSPayload,
  scheduledTime: Date,
): NodeJS.Timeout {
  const now = new Date();
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay < 0) {
    console.warn("Scheduled time is in the past");
    return setTimeout(() => sendMedicineSMS(payload), 1000);
  }

  return setTimeout(() => {
    sendMedicineSMS(payload).then((result) => {
      if (result.success) {
        console.log(
          `SMS sent to ${payload.phoneNumber} for ${payload.medicineName}`,
        );
      }
    });
  }, delay);
}

/**
 * Format medicine reminder as SMS text
 */
function formatMedicineReminder(payload: SMSPayload): string {
  const { medicineName, dosage, time, notes } = payload;
  let message = `💊 Medicine Reminder: Take ${medicineName} (${dosage}) at ${time}`;

  if (notes) {
    message += `. Note: ${notes}`;
  }

  message += ". Stay healthy! 🏥 - AI Health Companion";

  return message;
}

/**
 * Simulate SMS send for demo/testing
 */
function simulateSMS(payload: SMSPayload): SMSResponse {
  console.log("📱 [SIMULATED SMS]");
  console.log(`To: ${payload.phoneNumber}`);
  console.log(`Message: ${formatMedicineReminder(payload)}`);

  return {
    success: true,
    messageId: `SMS-DEMO-${Date.now()}`,
  };
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Accept various formats: +1234567890, 1234567890, +1 (234) 567-8900, etc.
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return phoneRegex.test(cleaned);
}

/**
 * Sanitize phone number to E.164 format
 */
export function sanitizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-()]/g, "");

  // Add + if not present
  if (!cleaned.startsWith("+")) {
    cleaned = `+${cleaned}`;
  }

  return cleaned;
}

/**
 * Check if SMS notifications are enabled for user
 */
export function isSMSEnabled(userProfile: any): boolean {
  return (
    userProfile?.phoneVerified === true &&
    !!userProfile?.phone &&
    isValidPhoneNumber(userProfile.phone)
  );
}

/**
 * Track SMS send history
 */
export interface SMSHistory {
  reminderId: string;
  phoneNumber: string;
  medicineName: string;
  sentAt: number;
  success: boolean;
  messageId?: string;
}

const smsHistory: SMSHistory[] = [];

export function addToSMSHistory(
  reminderId: string,
  phoneNumber: string,
  medicineName: string,
  success: boolean,
  messageId?: string,
): void {
  smsHistory.push({
    reminderId,
    phoneNumber,
    medicineName,
    sentAt: Date.now(),
    success,
    messageId,
  });
}

export function getSMSHistory(reminderId?: string): SMSHistory[] {
  if (!reminderId) return smsHistory;
  return smsHistory.filter((h) => h.reminderId === reminderId);
}
