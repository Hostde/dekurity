import whois from 'whois-json';

export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    res.status(400).setHeader('Content-Type', 'text/plain');
    return res.send('Domain tidak boleh kosong');
  }

  try {
    const result = await whois(domain.trim());
    const plainText = JSON.stringify(result, null, 2); // masih JSON, tapi dikonversi ke string rapi
    res.status(200).setHeader('Content-Type', 'text/plain');
    res.send(plainText); // kirim sebagai teks biasa
  } catch (err) {
    res.status(500).setHeader('Content-Type', 'text/plain');
    res.send('Gagal mengambil data WHOIS');
  }
}
