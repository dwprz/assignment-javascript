const masonry = document.getElementById("masonry");

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/photos");
    const { data } = await res.json();

    // Inisialisasi Masonry
    initializeMasonry(data);

    // Inisialisasi Pencarian
    initializeSearch(data);
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk inisialisasi Masonry
function initializeMasonry(data) {
  const pictures = data.slice(0, 16);
  createMasonry(pictures);

  const morePic = document.getElementById("morePic");
  morePic.addEventListener("click", () => loadMorePictures(data));
}

// Fungsi untuk membuat Masonry
function createMasonry(pictures) {
  pictures.forEach((item) => {
    const imgElm = createImgElm(item);
    masonry.appendChild(imgElm);
  });
}

// Fungsi untuk memuat lebih banyak gambar
function loadMorePictures(data) {
  const allItemMasonry = document.querySelectorAll(".itemMasonry");
  if (allItemMasonry.length === data.length) {
    document.getElementById("morePic").textContent = "all photos are complete";
  }

  const startIndex = allItemMasonry.length;
  const pictures = data.slice(startIndex, startIndex + 16);
  createMasonry(pictures);
}

// Fungsi untuk inisialisasi pencarian
function initializeSearch(data) {
  const search = document.getElementById("search");
  const heroImage = document.getElementById("heroImage");

  search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      masonry.innerHTML = "";

      const input = search.value.split(" ");
      const dataForSearch = data.filter((item) =>
        input.every((word) => item.tag.includes(word.toLowerCase()))
      );

      document.getElementById("totalPic").textContent = String(
        "Pictures " + dataForSearch.length
      );

      if (dataForSearch.length < 16) hideElm("buttonPagination");

      const pictures = dataForSearch.slice(0, 16);
      createMasonry(pictures);

      search.value = "";

      heroImage.classList.toggle("brightness-50");
      heroImage.classList.toggle("brightness-75");
    }
  });
}

// Fungsi untuk menyembunyikan elemen
function hideElm(id) {
  document.getElementById(id).className = "hidden";
}

// Fungsi untuk membuat elemen gambar
function createImgElm(item) {
  const imgElm = document.createElement("img");
  imgElm.className = "itemMasonry mb-2";
  imgElm.src = `../public/${item.src}`;
  imgElm.addEventListener("click", () => showPictureDetails(item));
  return imgElm;
}

// Fungsi untuk menampilkan detail gambar
function showPictureDetails(item) {
  const picDetail = document.getElementById("picDetail");
  picDetail.classList.toggle("hidden");
  picDetail.classList.toggle("flex");

  const figure = document.getElementById("figure");
  const figureChild = figure.childNodes;

  figureChild[1].src = `../public/${item.src}`;

  const figcaptionChild = figureChild[3].childNodes;
  figcaptionChild[1].textContent = item.title;
  figcaptionChild[3].childNodes[1].textContent = item.location;
  figcaptionChild[5].href = `../public/${item.src}`;

  const download = item.src.split("/");
  figcaptionChild[5].download = download[3];
}

getData();
