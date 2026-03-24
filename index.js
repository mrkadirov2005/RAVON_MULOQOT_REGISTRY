const GOOGLE_SHEETS_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwc2pqUkSdh6_CG6yXpIz1a8vSprW673YrRJYpqP0nAUB0PYnBZsTPAP65702pSXnV2PQ/exec';

const form = document.getElementById('regForm');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#b00020' : '#0a7a0a';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    ism: form.ism.value.trim(),
    familiya: form.familiya.value.trim(),
    maktab: form.maktab.value.trim(),
    sinf: form.sinf.value.trim(),
    olimpiada: form.olimpiada.value,
  };

  if (!data.ism || !data.familiya || !data.maktab || !data.sinf || !data.olimpiada) {
    setStatus("Iltimos, barcha maydonlarni to'ldiring.", true);
    return;
  }

  submitBtn.disabled = true;
  setStatus('Yuborilmoqda...');

  try {
    await fetch(GOOGLE_SHEETS_APPSCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    form.reset();
    setStatus('Muvaffaqiyatli yuborildi.');
  } catch (err) {
    setStatus("Xatolik yuz berdi. Qayta urinib ko'ring.", true);
  } finally {
    submitBtn.disabled = false;
  }
});
