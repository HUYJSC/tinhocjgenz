/**
 * SMS & Mobile Dispatcher Service for Admin OTP Authentication
 * Integrates with standard Vietnam SMS Gateways (SpeedSMS, eSMS) and Telegram Mobile Alert.
 */

export interface SmsSendResult {
  success: boolean;
  provider: "speedsms" | "esms" | "twilio" | "telegram" | "none";
  messageId?: string;
  error?: string;
}

export const SmsService = {
  /**
   * Format Vietnamese phone number to international standard (+84...)
   */
  formatPhoneInternational(phone: string): string {
    const clean = phone.replace(/\D/g, "");
    if (clean.startsWith("84")) return `+${clean}`;
    if (clean.startsWith("0")) return `+84${clean.slice(1)}`;
    return `+84${clean}`;
  },

  /**
   * Format Vietnamese phone number for local SMS gateways (84...)
   */
  formatPhoneLocal(phone: string): string {
    const clean = phone.replace(/\D/g, "");
    if (clean.startsWith("84")) return clean;
    if (clean.startsWith("0")) return `84${clean.slice(1)}`;
    return clean;
  },

  /**
   * Dispatch OTP directly to administrator's phone
   */
  async sendOtp(phone: string, otp: string): Promise<SmsSendResult> {
    const messageContent = `[Tin Hoc Gen Z] Ma xac thuc OTP khoi phuc mat khau Admin cua ban la: ${otp}. Ma co hieu luc trong 10 phut. Vui long khong chia se ma nay cho bat ky ai.`;

    // 1. Check for SpeedSMS Gateway (VN)
    const speedSmsToken = process.env.SPEEDSMS_ACCESS_TOKEN;
    if (speedSmsToken) {
      try {
        const localPhone = this.formatPhoneLocal(phone);
        const res = await fetch("https://api.speedsms.vn/index.php/sms/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`${speedSmsToken}:x`).toString("base64")}`,
          },
          body: JSON.stringify({
            to: [localPhone],
            content: messageContent,
            sms_type: 2, // OTP type
            sender: process.env.SPEEDSMS_SENDER || "",
          }),
        });

        const data = await res.json();
        if (data.status === "success") {
          return { success: true, provider: "speedsms", messageId: data.data?.tranId };
        }
      } catch (err) {
        console.error("[SmsService] SpeedSMS delivery failed:", err);
      }
    }

    // 2. Check for eSMS Gateway (VN)
    const esmsApiKey = process.env.ESMS_API_KEY;
    const esmsSecretKey = process.env.ESMS_SECRET_KEY;
    if (esmsApiKey && esmsSecretKey) {
      try {
        const localPhone = this.formatPhoneLocal(phone);
        const url = `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${localPhone}&Content=${encodeURIComponent(
          messageContent
        )}&ApiKey=${esmsApiKey}&SecretKey=${esmsSecretKey}&SmsType=2`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.CodeResult === "100") {
          return { success: true, provider: "esms", messageId: data.SMSID };
        }
      } catch (err) {
        console.error("[SmsService] eSMS delivery failed:", err);
      }
    }

    // 3. Check for Twilio SMS
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
    if (twilioSid && twilioAuth && twilioFrom) {
      try {
        const intlPhone = this.formatPhoneInternational(phone);
        const authHeader = `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`;
        const body = new URLSearchParams({
          To: intlPhone,
          From: twilioFrom,
          Body: messageContent,
        });

        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: authHeader,
            },
            body: body.toString(),
          }
        );

        const data = await res.json();
        if (res.ok && data.sid) {
          return { success: true, provider: "twilio", messageId: data.sid };
        }
      } catch (err) {
        console.error("[SmsService] Twilio delivery failed:", err);
      }
    }

    // 4. Check for Telegram Bot Mobile Alert
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const tgMsg = `🔐 *[TIN HỌC GEN Z - OTP ADMIN]*\n\nMã xác thực OTP gửi đến số *${phone}* là:\n👉 \`${otp}\`\n\n_Hiệu lực trong 10 phút. Tuyệt đối không chia sẻ mã này._`;
        const res = await fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: tgMsg,
              parse_mode: "Markdown",
            }),
          }
        );

        const data = await res.json();
        if (data.ok) {
          return { success: true, provider: "telegram", messageId: String(data.result?.message_id) };
        }
      } catch (err) {
        console.error("[SmsService] Telegram delivery failed:", err);
      }
    }

    // If no provider is configured yet, log in server environment
    console.warn(
      `[SmsService] CHƯA CẤU HÌNH CỔNG SMS (SpeedSMS/eSMS/Twilio/Telegram). OTP cho ${phone} là: ${otp}`
    );

    return {
      success: false,
      provider: "none",
      error:
        "Hệ thống chưa kết nối cổng SMS Gateway (SpeedSMS / eSMS / Twilio / Telegram). Vui lòng cấu hình API Key để tin nhắn gửi trực tiếp về máy điện thoại.",
    };
  },
};
