const form = document.getElementById("shorten-form");
const originalUrlInput = document.getElementById("originalUrl");
const customCodeInput = document.getElementById("customCode");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");
const shortUrlAnchor = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");
  errorDiv.textContent = "";

  const originalUrl = originalUrlInput.value.trim();
  const customCode = customCodeInput.value.trim();

  const body = { originalUrl };

  if (customCode) {
    body.customCode = customCode;
  }

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    shortUrlAnchor.href = data.shortUrl;
    shortUrlAnchor.textContent = data.shortUrl;
    resultDiv.classList.remove("hidden");

    originalUrlInput.value = "";
    customCodeInput.value = "";
  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
  }
});

copyBtn.addEventListener("click", async () => {
  const url = shortUrlAnchor.textContent;

  try {
    await navigator.clipboard.writeText(url);

    copyMessage.classList.remove("hidden");

    setTimeout(() => {
      copyMessage.classList.add("hidden");
    }, 2000);
  } catch (err) {
    alert("Failed to copy");
  }
});