const sliderPosts = document.querySelector(".posts");
if (sliderPosts) {
  new Swiper(".posts", {
    spaceBetween: 24,
    speed: 1000,
    slidesPerView: "auto",
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: "auto",
      },
    },
  });
}
