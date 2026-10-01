async function loadCompanies() {
  const companiesBox = document.getElementById("companies");
  const countBox = document.getElementById("count");

  try {
    const response = await fetch("/api/companies");

    if (!response.ok) {
      throw new Error("فشل الاتصال بالخادم");
    }

    const companies = await response.json();

    if (countBox) {
      countBox.textContent = companies.length;
    }

    if (!companies.length) {
      companiesBox.innerHTML = "<p>لا توجد شركات حاليًا.</p>";
      return;
    }

    companiesBox.innerHTML = companies.map(company => `
      <div class="company">
        <div>
          <strong>${escapeHtml(company.name)}</strong>
          <br>
          <small>${escapeHtml(company.type)}</small>
        </div>

        <div>
          <span class="badge">
            ${company.status ? "مفعّلة" : "متوقفة"}
          </span>

          <button class="delete" onclick="deleteCompany(${company.id})">
            حذف
          </button>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    companiesBox.innerHTML =
      "<p style='color:red'>تعذر تحميل الشركات.</p>";
  }
}

async function deleteCompany(id) {
  if (!confirm("هل تريد حذف هذه الشركة؟")) return;

  await fetch("/api/companies/" + id, {
    method: "DELETE"
  });

  loadCompanies();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

loadCompanies();
