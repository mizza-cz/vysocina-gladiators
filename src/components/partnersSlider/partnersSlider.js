const partnersSwiper = document.querySelector(".partnersSlider");
if (partnersSwiper) {
  new Swiper(".partnersSlider", {
    loop: true,
    navigation: false,
    noSwipingClass: "swiper-slide",
    slidesPerView: "8",
    speed: 6000,
    slidesPerView: "auto",
    spaceBetween: 24,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
