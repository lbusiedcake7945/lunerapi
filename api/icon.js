import { createCanvas } from 'canvas';

export default function handler(req, res) {
  const { isim = 'Sunucu' } = req.query;
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');

  // Rastgele pastel arka plan
  const h = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${h}, 70%, 80%)`;
  ctx.beginPath();
  ctx.arc(150, 150, 150, 0, Math.PI * 2);
  ctx.fill();

  // Baş harfler
  const initials = isim
    .split(/\s+/)
    .map(w => w[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  ctx.fillStyle = '#333';
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 150, 160);

  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
}
