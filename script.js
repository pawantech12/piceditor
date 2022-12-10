const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".imgsrc"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");
  cropBtn = document.querySelector(".cropbtn");
  zoominBtn = document.querySelector(".zoomin");
  // zoomoutBtn = document.querySelector(".zoomout");
  cropper = "";

let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0",
  contrast = "100",
  sepia = "0",
  huerotate = "0",
  blur = "0",
  opacity = "100";
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click();
    document.querySelector(".container").classList.remove("disable");
  });
};

const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${huerotate}deg) blur(${
    blur / 40
  }px) opacity(${opacity}%)`;
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    } else if (option.id === "contrast") {
      filterSlider.max = "300";
      filterSlider.value = contrast;
      filterValue.innerText = `${contrast}%`;
    } else if (option.id === "sepia") {
      filterSlider.max = "200";
      filterSlider.value = sepia;
      filterValue.innerText = `${sepia}%`;
    } else if (option.id === "huerotate") {
      filterSlider.max = "360";
      filterSlider.value = huerotate;
      filterValue.innerText = `${huerotate}%`;
    } else if (option.id === "blur") {
      filterSlider.max = "100";
      filterSlider.value = blur;
      filterValue.innerText = `${blur}%`;
    } else if (option.id === "opacity") {
      filterSlider.max = "100";
      filterSlider.value = opacity;
      filterValue.innerText = `${opacity}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  } else if (selectedFilter.id === "contrast") {
    contrast = filterSlider.value;
  } else if (selectedFilter.id === "sepia") {
    sepia = filterSlider.value;
  } else if (selectedFilter.id === "huerotate") {
    huerotate = filterSlider.value;
  } else if (selectedFilter.id === "blur") {
    blur = filterSlider.value;
  } else if (selectedFilter.id === "opacity") {
    opacity = filterSlider.value;
  }
  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else if (option.id === "vertical"){
      flipVertical = flipVertical === 1 ? -1 : 1;
    } else if (option.id === "zoomout"){
      var currentwidth = previewImg.clientWidth;
      previewImg.style.width = (currentwidth - 100) + "px";
    }
    applyFilter();
  });
});

zoominBtn.addEventListener("click", () => {
  var currentwidth = previewImg.clientWidth;
  previewImg.style.width = (currentwidth + 100) + "px";
})



const resetFilter = () => {
  brightness = "100";
  saturation = "100";
  inversion = "0";
  grayscale = "0";
  contrast = "100";
  sepia = "0";
  huerotate = "0";
  blur = "0";
  opacity = "100";
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilter();
  
};

// working with crop functionality by using js library "cropper.js"
function crop() {
  chooseImgBtn.classList.add("hide");
  cropBtn.classList.remove("hide");
  cropper = new Cropper(previewImg);
}
cropBtn.addEventListener("click", () => {
  previewImg.src = cropper.getCroppedCanvas({}).toDataURL();
  cropper.destroy();
  chooseImgBtn.classList.remove("hide");
  cropBtn.classList.add("hide");
});


// saving functionality for saving image 
const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${huerotate}deg) blur(${
    blur / 40
  }px) opacity(${opacity}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

// A series of function that handle the preset filters
// Each of these will first reset the current changes to the image
// and then it will apply certain predefined filters to the image before redrawing the image
function brightenfilter() {
  resetFilter();
  brightness = 130;
  saturation = 120;
  contrast = 120;
  applyFilter();
}

function bwfilter() {
  resetFilter();
  brightness = 120;
  contrast = 120;
  grayscale = 100;
  applyFilter();
}

function funkyfilter() {
  resetFilter();
  huerotate = Math.floor(Math.random() * 360) + 1;
  contrast = 120;
  applyFilter();
}

function vintagefilter() {
  resetFilter();
  brightness = 120;
  saturation = 120;
  sepia = 150;
  applyFilter();
}
