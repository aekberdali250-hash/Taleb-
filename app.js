async function loadCompanies() {
  const list = document.getElementById("companyList");

  if (!list) {
    console.error("العنصر companyList غير موجود");
    return;
  }

  try {
    const response = await fetch("/api/companies");

    if (!response.ok) {
      throw new Error("API error");
    }

    const companies = await response.json();

    if (!companies.length) {
      list.innerHTML = "<p>لا توجد شركات متاحة حاليًا.</p>";
      return;
    }

    list.innerHTML = companies.map(company => `
      <div class="company">
        <div>
          <b>${escapeHtml(company.name)}</b>
          <br>
          <small>${escapeHtml(company.type)}</small>
        </div>

        <span class="badge">
          ${company.status ? "مفعّلة" : "متوقفة"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    list.textContent = "تعذر تحميل الشركات";
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

loadCompanies();
