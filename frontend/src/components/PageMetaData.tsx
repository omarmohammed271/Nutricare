import { Helmet } from "react-helmet-async";

const PageMetaData = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title> {title} | Nutricare - Nutrition & Health Management Platform </title>
    </Helmet>
  );
};

export default PageMetaData;
