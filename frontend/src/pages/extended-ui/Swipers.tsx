import { Grid } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCreative,
  EffectFade,
  EffectFlip,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
// import 'swiper/css/effect-flip'
// import 'swiper/element/css/effect-flip'

// images
import picture1 from "@src/assets/images/small/small-1.jpg";
import picture2 from "@src/assets/images/small/small-2.jpg";
import picture3 from "@src/assets/images/small/small-3.jpg";
import picture4 from "@src/assets/images/small/small-4.jpg";
import picture5 from "@src/assets/images/small/small-5.jpg";
import picture6 from "@src/assets/images/small/small-6.jpg";
import picture7 from "@src/assets/images/small/small-7.jpg";

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

const DefaultSwiper = () => {
  return (
    <ComponentContainerCard title="Default">
      <Swiper
        className="rounded default-swiper"
        autoplay={{ delay: 2000 }}
        loop={true}
        height={316}
        modules={[Autoplay]}>
        <SwiperSlide>
          <img src={picture1} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture3} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const NavigationNPaginationSwiper = () => {
  return (
    <ComponentContainerCard title="Navigation & Pagination">
      <Swiper
        className="navigation-swiper rounded"
        loop={true}
        navigation={true}
        autoplay={{ delay: 2000 }}
        pagination={{ type: "bullets" }}
        modules={[Pagination, Autoplay, Navigation]}>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture5} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const PaginationDynamicSwiper = () => {
  return (
    <ComponentContainerCard title="Pagination Dynamic">
      <Swiper
        className="pagination-dynamic-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Autoplay]}>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture1} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const PaginationFractionSwiper = () => {
  return (
    <ComponentContainerCard title="Pagination Fraction">
      <Swiper
        className="pagination-fraction-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={true}
        pagination={{ type: "fraction" }}
        modules={[Pagination, Autoplay, Navigation]}>
        <SwiperSlide>
          <img src={picture5} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture3} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const PaginationCustomSwiper = () => {
  return (
    <ComponentContainerCard title="Pagination Custom">
      <Swiper
        className="pagination-custom-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={pagination}
        modules={[Pagination, Autoplay]}>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture3} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const PaginationProgressSwiper = () => {
  return (
    <ComponentContainerCard title="Pagination Progress">
      <Swiper
        className="pagination-progress-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={true}
        pagination={{ type: "progressbar" }}
        modules={[Pagination, Autoplay, Navigation]}>
        <SwiperSlide>
          <img src={picture5} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture7} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const ScrollbarSwiper = () => {
  return (
    <ComponentContainerCard title="Scrollbar">
      <Swiper
        className="pagination-scrollbar-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation={true}
        scrollbar={{ hide: true }}
        modules={[Pagination, Autoplay, Scrollbar, Navigation]}>
        <SwiperSlide>
          <img src={picture7} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture1} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const VerticalSwiper = () => {
  return (
    <ComponentContainerCard title="Vertical">
      <Swiper
        className="vertical-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        direction="vertical"
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        style={{ height: 324 }}>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture1} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const MouseWheelControlSwiper = () => {
  return (
    <ComponentContainerCard title="Mouse Wheel Control">
      <Swiper
        className="vertical-swiper rounded"
        loop={true}
        autoplay={{ delay: 2000 }}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Mousewheel]}
        style={{ height: 324 }}>
        <SwiperSlide>
          <img src={picture3} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture5} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const EffectFadeSwiper = () => {
  return (
    <ComponentContainerCard title="Effect Fade">
      <Swiper
        className="navigation-swiper rounded"
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay, Pagination, EffectFade]}>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture7} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const EffectCreativeSwiper = () => {
  return (
    <ComponentContainerCard title="Effect Creative">
      <Swiper
        className="navigation-swiper rounded"
        pagination={{ clickable: true }}
        effect="creative"
        grabCursor={true}
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] },
        }}
        loop={true}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay, Pagination, EffectCreative]}>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture6} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture7} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const EffectFlipSwiper = () => {
  return (
    <ComponentContainerCard title="Effect Flip">
      <Swiper
        className="navigation-swiper rounded"
        loop={true}
        autoplay={true}
        pagination={true}
        grabCursor={true}
        effect="flip"
        modules={[Autoplay, Pagination, EffectFlip]}>
        <SwiperSlide>
          <img src={picture4} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture1} alt="" height={316} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={picture2} alt="" height={316} />
        </SwiperSlide>
      </Swiper>
    </ComponentContainerCard>
  );
};

const Swipers = () => {
  return (
    <>
      <PageBreadcrumb title="Swiper" subName="Extended UI" />

      <Grid container spacing={3}>
        <Grid item lg={4}>
          <DefaultSwiper />
        </Grid>

        <Grid item lg={4}>
          <NavigationNPaginationSwiper />
        </Grid>

        <Grid item lg={4}>
          <PaginationDynamicSwiper />
        </Grid>

        <Grid item lg={4}>
          <PaginationFractionSwiper />
        </Grid>

        <Grid item lg={4}>
          <PaginationCustomSwiper />
        </Grid>

        <Grid item lg={4}>
          <PaginationProgressSwiper />
        </Grid>

        <Grid item lg={4}>
          <ScrollbarSwiper />
        </Grid>

        <Grid item lg={4}>
          <VerticalSwiper />
        </Grid>

        <Grid item lg={4}>
          <MouseWheelControlSwiper />
        </Grid>

        <Grid item lg={4}>
          <EffectFadeSwiper />
        </Grid>

        <Grid item lg={4}>
          <EffectCreativeSwiper />
        </Grid>

        <Grid item lg={4}>
          <EffectFlipSwiper />
        </Grid>
      </Grid>
    </>
  );
};

export default Swipers;
