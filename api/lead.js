// Serverless-функция (Vercel / Netlify-совместимый формат Node.js).
// Принимает заявку с сайта и отправляет её в Telegram.
// Переменные окружения:
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата/группы, куда слать заявки

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env
  if (!token || !chatId) return res.status(500).json({ ok: false, error: 'not configured' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const clean = (v, max = 500) => String(v ?? '').slice(0, max).trim()
  const name = clean(body.name, 80)
  const phone = clean(body.phone, 30)
  if (!name || phone.replace(/\D/g, '').length < 11) {
    return res.status(400).json({ ok: false, error: 'invalid' })
  }

  const text = [
    '🎉 Новая заявка с сайта',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Дата: ${clean(body.date, 20) || 'не указана'}`,
    '',
    clean(body.summary, 1500),
  ].join('\n')

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
  if (!tg.ok) return res.status(502).json({ ok: false })
  return res.status(200).json({ ok: true })
}
