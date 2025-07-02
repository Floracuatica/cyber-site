// assets/js/main.js
(() => {
  /* ---------- 1. VALIDACIÓN DE CONTACTO ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre  = document.getElementById('nombre');
      const correo  = document.getElementById('correo');
      const mensaje = document.getElementById('mensaje');
      const emailOK = /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/i.test(correo.value);

      // Limpia clases previas
      [nombre, correo, mensaje].forEach(i => i.classList.remove('is-invalid'));

      if (!nombre.value.trim() || !mensaje.value.trim() || !emailOK) {
        if (!nombre.value.trim())  nombre.classList.add('is-invalid');
        if (!mensaje.value.trim()) mensaje.classList.add('is-invalid');
        if (!emailOK)              correo.classList.add('is-invalid');
        return;
      }

      /* Aquí podrías hacer fetch() o EmailJS; por ahora solo feedback */
      form.reset();
      alert('¡Gracias! Te responderemos pronto 🛡️');
    });
  }

  /* ---------- 2. TEST DE SEGURIDAD EN MODAL ---------- */
  const modalEl = document.getElementById('testModal');
  if (modalEl) {
    const modal   = new bootstrap.Modal(modalEl);
    const body    = modalEl.querySelector('.modal-body');
    const footer  = modalEl.querySelector('.modal-footer');
    let puntaje   = 0, respondidas = 0;

    // Marca cada botón correcto con data-correct="1"
    body.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        // Evita doble clic
        if (btn.dataset.clicked) return;
        btn.dataset.clicked = true;

        // Agrega clase visual
        const correcto = btn.dataset.correct === '1';
        btn.classList.add(correcto ? 'btn-success' : 'btn-danger');
        if (correcto) puntaje++;
        respondidas++;

        // Cuando se contesten todas, muestra resultado
        if (respondidas === body.querySelectorAll('button').length) {
          footer.firstElementChild.insertAdjacentHTML(
            'beforebegin',
            `<span class="me-auto fw-bold">Puntaje: ${puntaje}/${respondidas}</span>`
          );
        }
      });
    });

    // Resetea al abrir nuevamente
    modalEl.addEventListener('show.bs.modal', () => {
      puntaje = respondidas = 0;
      body.querySelectorAll('button').forEach(btn => {
        btn.dataset.clicked = '';
        btn.classList.remove('btn-success', 'btn-danger');
      });
      footer.querySelector('span')?.remove();
    });
  }
})();
