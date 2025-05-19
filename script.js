const keyList = [
  "Driftywn-A73F9C", "Driftywn-X92L5B", "Driftywn-K1T4ZM", "Driftywn-NE83V2",
  "Driftywn-Q5X9AL", "Driftywn-MF62PD", "Driftywn-Y84KJC", "Driftywn-UBR91X",
  "Driftywn-ZM4EQT", "Driftywn-TA57WG", "Driftywn-V19QKC", "Driftywn-JX76RB",
  "Driftywn-WEP32N", "Driftywn-CRF84Z", "Driftywn-9TQ3MB", "Driftywn-H21XLO",
  "Driftywn-GB76YC", "Driftywn-LE82VX", "Driftywn-N43DZM", "Driftywn-KX5P9A",
  "Driftywn-LM84NQ", "Driftywn-6D4V2A", "Driftywn-MK1P8B", "Driftywn-JH3N9T",
  "Driftywn-QR7V6P", "Driftywn-GH5S3W", "Driftywn-CV91D4", "Driftywn-TW2J8S",
  "Driftywn-PX9F0E", "Driftywn-YN6Z2D", "Driftywn-TH4X5B", "Driftywn-U92F3C",
  "Driftywn-FH1A9L", "Driftywn-OB5V7M", "Driftywn-RJ8K2N", "Driftywn-QT3B0C",
  "Driftywn-91D6X9", "Driftywn-ZR4T6V", "Driftywn-NQ8K5L", "Driftywn-BV2F9J",
  "Driftywn-HO1P3Z", "Driftywn-SG6M8Y", "Driftywn-FJ1A4W", "Driftywn-KL9Q2R",
  "Driftywn-PM7E1B", "Driftywn-VW4S0U", "Driftywn-TY6N3A", "Driftywn-EX8B5F"
];

const button = document.querySelector("button");

function generateKey() {
  const now = Date.now();
  const expiry = localStorage.getItem("keyExpiry");

  if (expiry && now < parseInt(expiry)) return;

  const randomKey = keyList[Math.floor(Math.random() * keyList.length)];
  const expiresAt = now + 24 * 60 * 60 * 1000;

  localStorage.setItem("userKey", randomKey);
  localStorage.setItem("keyTime", now.toString());
  localStorage.setItem("keyExpiry", expiresAt.toString());

  document.getElementById("keyBox").value = randomKey;

  button.disabled = true;
  button.style.opacity = "0.5";
  button.style.cursor = "not-allowed";

  const infoElement = document.getElementById("info");
  infoElement.innerText = "Key generated successfully!";
  setTimeout(() => {
    updateExpirationCountdown(expiresAt);
  }, 1000);
}

function updateExpirationCountdown(expiryTime) {
  const infoElement = document.getElementById("info");
  const interval = setInterval(() => {
    const now = Date.now();
    const remainingTime = expiryTime - now;

    if (remainingTime <= 0) {
      clearInterval(interval);
      infoElement.innerText = "Key has expired!";
      localStorage.removeItem("userKey");
      localStorage.removeItem("keyTime");
      localStorage.removeItem("keyExpiry");

      button.disabled = false;
      button.style.opacity = "1";
      button.style.cursor = "pointer";
    } else {
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      infoElement.innerText = `Expires in ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
  }, 1000);
}

// On page load
window.onload = () => {
  const key = localStorage.getItem("userKey");
  const expiry = localStorage.getItem("keyExpiry");
  const now = Date.now();

  if (key && expiry && now < parseInt(expiry)) {
    document.getElementById("keyBox").value = key;
    button.disabled = true;
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
    updateExpirationCountdown(parseInt(expiry));
  }
};
