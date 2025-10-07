// Toggle post type selector
document
  .getElementById("createPostInput")
  .addEventListener("click", function () {
    document.getElementById("postTypeSelector").classList.toggle("active");
  });

// Select post type
function selectPostType(type) {
  if (type === "plantio") {
    window.location.href = "criar-plantio.html";
  } else if (type === "denuncia") {
    window.location.href = "criar-denuncia.html";
  } else if (type === "comunidade") {
    window.location.href = "criar-comunidade.html";
  }
}

// Toggle like
function toggleLike(button) {
  button.classList.toggle("liked");
  const icon = button.querySelector("i");
  if (button.classList.contains("liked")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
  }
}

// Close selector when clicking outside
document.addEventListener("click", function (e) {
  const selector = document.getElementById("postTypeSelector");
  const input = document.getElementById("createPostInput");
  if (!selector.contains(e.target) && e.target !== input) {
    selector.classList.remove("active");
  }
});
