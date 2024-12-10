document.getElementById("formulario").addEventListener("submit", function (ev) {
  ev.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const errorName = document.getElementById("errorName");
  const errorEmail = document.getElementById("errorEmail");
  const errorPhone = document.getElementById("errorPhone");
  const errorMessage = document.getElementById("errorMessage");

  //Resetear mensajes de error
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorPhone.textContent = "";
  errorMessage.textContent = "";

  name.classList.remove("error");
  email.classList.remove("error");
  phone.classList.remove("error");
  message.classList.remove("error");

  let isValid = true;

  if (name.value.trim() === "") {
    errorName.textContent = "Ingrese su nombre!";
    name.classList.add("error");
    isValid = false;
  }

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(email.value)) {
    errorEmail.textContent = "Ingrese su correo!";
    email.classList.add("error");
    isValid = false;
  }

  const telefonoRegex = /^[0-9]+$/;
  if (!telefonoRegex.test(phone.value)) {
    errorPhone.textContent = "El teléfono solo debe de contener números";
    phone.classList.add("error");
    isValid = false;
  }

  if (message.value.trim() === "") {
    errorMessage.textContent = "Ingrese se mensaje!";
    message.classList.add("error");
    isValid = false;
  }

  if (isValid) {
    alert("Formulario enviado con éxito.");
    this.reset();
  }
});

function validarEnTiempoReal(input, regex, errorElement, mensajeError) {
  input.addEventListener("input", function () {
    if (regex.test(input.value.trim())) {
      errorElement.textContent = "";
      input.classList.remove("error");
    } else {
      errorElement.textContent = mensajeError;
      input.classList.add("error");
    }
  });
}
validarEnTiempoReal(
  document.getElementById("name"),
  /.+/,
  document.getElementById("errorName"),
  "Ingrese su nombre!"
);

validarEnTiempoReal(
  document.getElementById("email"),
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  document.getElementById("errorEmail"),
  "Ingrese un correo válido!"
);

validarEnTiempoReal(
  document.getElementById("phone"),
  /^[0-9]+$/,
  document.getElementById("errorPhone"),
  "El teléfono solo debe de contener números"
);

validarEnTiempoReal(
  document.getElementById("message"),
  /.+/,
  document.getElementById("errorMessage"),
  "Ingrese su mensaje!"
);
