const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Build themed HTML email for consultation form (Image 1 — main contact section)
 */
function buildConsultationEmail({ firstName, lastName, email, practiceName, specialty, goals }) {
  const logoUrl = `${process.env.BASE_URL}/uploads/Untitled%20design-6.png`;
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0;padding:0;background:#faf7f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid rgba(154,122,80,0.16);">

          <!-- Logo -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px;text-align:center;border-bottom:0.5px solid rgba(154,122,80,0.12);">
              <img src="${logoUrl}" alt="CM Marketing" width="140" style="display:block;margin:0 auto;height:auto;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:36px 40px 12px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#9a7a50;">New Consultation Request</p>
              <h2 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#2c2318;line-height:1.3;">
                Book a Consultation <span style="color:#9a7a50;font-style:italic;">Submission</span>
              </h2>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(154,122,80,0.16);"></div></td></tr>

          <!-- Details -->
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Name</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${firstName} ${lastName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Email</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Practice / Business</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${practiceName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Specialty</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${specialty}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Goals</span><br/>
                    <span style="font-size:15px;color:#2c2318;line-height:1.7;">${goals}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA block -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:#f3ebe0;border:1px solid rgba(154,122,80,0.16);padding:20px 24px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#6a5c4c;letter-spacing:0.06em;">
                  Respond within <strong style="color:#9a7a50;">24 hours</strong> to schedule their complimentary strategy call.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3ebe0;padding:20px 40px;text-align:center;border-top:1px solid rgba(154,122,80,0.16);">
              <p style="margin:0;font-size:11px;color:#9e8e7c;letter-spacing:0.1em;">CM Marketing · Los Angeles · Germany · International</p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/**
 * Build themed HTML email for strategy call popup (Image 2 — popup modal)
 */
function buildStrategyCallEmail({ name, practiceName, email, phone }) {
  const logoUrl = `${process.env.BASE_URL}/uploads/Untitled%20design-6.png`;
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0;padding:0;background:#faf7f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid rgba(154,122,80,0.16);">

          <!-- Logo -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px;text-align:center;border-bottom:0.5px solid rgba(154,122,80,0.12);">
              <img src="${logoUrl}" alt="CM Marketing" width="140" style="display:block;margin:0 auto;height:auto;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:36px 40px 12px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#9a7a50;">Free Strategy Call</p>
              <h2 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#2c2318;line-height:1.3;">
                Strategy Call <span style="color:#9a7a50;font-style:italic;">Request</span>
              </h2>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(154,122,80,0.16);"></div></td></tr>

          <!-- Details -->
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Name</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Practice Name</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${practiceName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(154,122,80,0.1);">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Email</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#9a7a50;">Phone</span><br/>
                    <span style="font-size:15px;color:#2c2318;">${phone}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA block -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:#f3ebe0;border:1px solid rgba(154,122,80,0.16);padding:20px 24px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#6a5c4c;letter-spacing:0.06em;">
                  This person requested a <strong style="color:#9a7a50;">Free Strategy Call</strong>. Follow up within 24 hours.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3ebe0;padding:20px 40px;text-align:center;border-top:1px solid rgba(154,122,80,0.16);">
              <p style="margin:0;font-size:11px;color:#9e8e7c;letter-spacing:0.1em;">CM Marketing · Los Angeles · Germany · International</p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/**
 * Build themed HTML confirmation email sent TO the user
 */
function buildUserConfirmationEmail(name) {
  const logoUrl = `${process.env.BASE_URL}/uploads/Untitled%20design-6.png`;
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8" /></head>
  <body style="margin:0;padding:0;background:#faf7f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid rgba(154,122,80,0.16);">

          <!-- Logo -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px;text-align:center;border-bottom:0.5px solid rgba(154,122,80,0.12);">
              <img src="${logoUrl}" alt="CM Marketing" width="140" style="display:block;margin:0 auto;height:auto;" />
            </td>
          </tr>

          <!-- Icon + Title -->
          <tr>
            <td style="padding:36px 40px 12px;text-align:center;">
              <div style="width:56px;height:56px;margin:0 auto 18px;border-radius:50%;background:rgba(154,122,80,0.1);line-height:56px;font-size:26px;color:#9a7a50;">&#10003;</div>
              <h2 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:300;color:#2c2318;line-height:1.3;">
                Thank You, <span style="color:#9a7a50;font-style:italic;">${name}</span>!
              </h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:20px 40px 28px;">
              <p style="margin:0;font-size:15px;color:#5a5046;line-height:1.8;text-align:center;">
                Your request has been submitted successfully. We've received your details and a member of our team will be in touch within <strong style="color:#9a7a50;">24 hours</strong> to schedule your complimentary strategy call.
              </p>
            </td>
          </tr>

          <!-- CTA block -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="background:#f3ebe0;border:1px solid rgba(154,122,80,0.16);padding:20px 24px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#6a5c4c;letter-spacing:0.06em;">
                  Questions? Reply to this email or call <strong style="color:#9a7a50;">(424) 394-9948</strong>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3ebe0;padding:20px 40px;text-align:center;border-top:1px solid rgba(154,122,80,0.16);">
              <p style="margin:0;font-size:11px;color:#9e8e7c;letter-spacing:0.1em;">CM Marketing &middot; Los Angeles &middot; Germany &middot; International</p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/**
 * Send confirmation email TO the user who submitted the form
 */
async function sendUserConfirmationEmail({ email, name }) {
  const html = buildUserConfirmationEmail(name);
  await transporter.sendMail({
    from: `"CM Marketing" <${process.env.EMAIL_USER}>`,
    to: email,
    replyTo: process.env.TO_EMAIL,
    subject: 'Your Request Has Been Submitted Successfully — CM Marketing',
    html,
  });
}

/**
 * Send consultation form email
 * replyTo = submitter's email so hitting Reply goes directly to them
 */
async function sendConsultationEmail(data) {
  const html = buildConsultationEmail(data);
  await transporter.sendMail({
    from: `"${data.firstName} ${data.lastName}" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: `New Consultation Request — ${data.firstName} ${data.lastName} | ${data.practiceName}`,
    html,
  });
}

/**
 * Send strategy call popup email
 * replyTo = submitter's email so hitting Reply goes directly to them
 */
async function sendStrategyCallEmail(data) {
  const html = buildStrategyCallEmail(data);
  await transporter.sendMail({
    from: `"${data.name}" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: `Free Strategy Call Request — ${data.name} | ${data.practiceName}`,
    html,
  });
}

module.exports = { sendConsultationEmail, sendStrategyCallEmail, sendUserConfirmationEmail };
