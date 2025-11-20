// app.js - Frontend para ApiMedico
// Endpoints usados (relativos al backend):
// POST   /medico/grabar
// GET    /medico/listar
// PUT    /medico/actualizar/{id}
// DELETE /medico/eliminar/{id}

let medicos = [];
let currentPage = 1;
const pageSize = 10; // 10 registros por página
let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medico-form");
  const btnLimpiar = document.getElementById("btn-limpiar");
  const btnRecargar = document.getElementById("btn-recargar");

  form.addEventListener("submit", onSubmitForm);
  btnLimpiar.addEventListener("click", limpiarFormulario);
  btnRecargar.addEventListener("click", cargarMedicos);

  cargarMedicos();
});

function mostrarAlerta(mensaje, tipo = "success") {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// Cargar todos los médicos
async function cargarMedicos() {
  try {
    const resp = await fetch("/medico/listar");
    if (!resp.ok) {
      throw new Error("Error al listar médicos");
    }
    medicos = await resp.json();
    currentPage = 1;
    renderTabla();
    renderPaginacion();
  } catch (error) {
    console.error(error);
    mostrarAlerta("No se pudieron cargar los médicos.", "danger");
  }
}

function renderTabla() {
  const tbody = document.getElementById("medicos-tbody");
  tbody.innerHTML = "";

  if (!medicos || medicos.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.className = "text-center text-muted";
    td.textContent = "No hay médicos registrados.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = medicos.slice(start, end);

  pageItems.forEach((medico) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = medico.id;

    const tdNom = document.createElement("td");
    tdNom.textContent = medico.nom;

    const tdApe = document.createElement("td");
    tdApe.textContent = medico.ape;

    const tdSpe = document.createElement("td");
    tdSpe.textContent = medico.spe;

    const tdAcciones = document.createElement("td");
    tdAcciones.className = "text-center";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-sm btn-outline-primary me-1";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => cargarEnFormulario(medico));

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-outline-danger";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarMedico(medico.id));

    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdId);
    tr.appendChild(tdNom);
    tr.appendChild(tdApe);
    tr.appendChild(tdSpe);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });
}

function renderPaginacion() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (!medicos || medicos.length <= pageSize) {
    return; // no hace falta paginar
  }

  const totalPages = Math.ceil(medicos.length / pageSize);

  // Botón "Anterior"
  const liPrev = document.createElement("li");
  liPrev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  const aPrev = document.createElement("a");
  aPrev.className = "page-link";
  aPrev.href = "#";
  aPrev.textContent = "Anterior";
  aPrev.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderTabla();
      renderPaginacion();
    }
  });
  liPrev.appendChild(aPrev);
  pagination.appendChild(liPrev);

  // Botones numéricos
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = i;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderTabla();
      renderPaginacion();
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  // Botón "Siguiente"
  const liNext = document.createElement("li");
  liNext.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  const aNext = document.createElement("a");
  aNext.className = "page-link";
  aNext.href = "#";
  aNext.textContent = "Siguiente";
  aNext.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderTabla();
      renderPaginacion();
    }
  });
  liNext.appendChild(aNext);
  pagination.appendChild(liNext);
}

// Enviar formulario (crear o actualizar)
async function onSubmitForm(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const ape = document.getElementById("ape").value.trim();
  const spe = document.getElementById("spe").value.trim();

  if (!nom || !ape || !spe) {
    mostrarAlerta("Complete todos los campos.", "warning");
    return;
  }

  const medicoData = { nom, ape, spe };

  try {
    let resp;
    if (editingId) {
      // Actualizar
      resp = await fetch(`/medico/actualizar/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicoData),
      });
    } else {
      // Crear
      resp = await fetch("/medico/grabar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicoData),
      });
    }

    if (!resp.ok) {
      throw new Error("Error al guardar médico");
    }

    await resp.json(); // no usamos la respuesta, solo para esperar

    mostrarAlerta(
      editingId ? "Médico actualizado correctamente." : "Médico registrado correctamente.",
      "success"
    );
    limpiarFormulario(false);
    cargarMedicos();
  } catch (error) {
    console.error(error);
    mostrarAlerta("Ocurrió un error al guardar el médico.", "danger");
  }
}

function cargarEnFormulario(medico) {
  editingId = medico.id;
  document.getElementById("medico-id").value = medico.id;
  document.getElementById("nom").value = medico.nom;
  document.getElementById("ape").value = medico.ape;
  document.getElementById("spe").value = medico.spe;

  document.getElementById("form-title").textContent = "Editar Médico";
  document.getElementById("btn-guardar").textContent = "Actualizar";
}

function limpiarFormulario(mostrarMensaje = true) {
  editingId = null;
  document.getElementById("medico-id").value = "";
  document.getElementById("nom").value = "";
  document.getElementById("ape").value = "";
  document.getElementById("spe").value = "";

  document.getElementById("form-title").textContent = "Registrar Médico";
  document.getElementById("btn-guardar").textContent = "Guardar";

  if (mostrarMensaje) {
    mostrarAlerta("Formulario limpio.", "info");
  }
}

// Eliminar médico
async function eliminarMedico(id) {
  const confirmar = window.confirm("¿Seguro que desea eliminar este médico?");
  if (!confirmar) return;

  try {
    const resp = await fetch(`/medico/eliminar/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      throw new Error("Error al eliminar médico");
    }

    mostrarAlerta("Médico eliminado correctamente.", "success");
    cargarMedicos();
  } catch (error) {
    console.error(error);
    mostrarAlerta("No se pudo eliminar el médico.", "danger");
  }
}
