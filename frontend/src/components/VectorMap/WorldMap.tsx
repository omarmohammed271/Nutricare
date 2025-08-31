import "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/jsvectormap.css";

//components
import BaseVectorMap from "./BaseVectorMap";

type WorldVectorMapProps = {
  width?: string;
  height?: string;
  options?: any;
};

/** @deprecated */
const WorldMap = ({ width, height, options }: WorldVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={options} type="world" />
    </>
  );
};

export default WorldMap;
