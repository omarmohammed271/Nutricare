import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { Fragment } from "react";
import { LuMoreVertical } from "react-icons/lu";

type MediaProps = {
  loading?: boolean;
};

const SkeletonVariants = () => {
  return (
    <>
      <ComponentContainerCard
        title="Skeleton Variants"
        description="The component supports 4 shape variants: text, circular, rectangular and rounded"
        stackProps={{ direction: "column" }}>
        {/* For variant= "text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </ComponentContainerCard>
    </>
  );
};

const SkeletonAnimation = () => {
  return (
    <>
      <ComponentContainerCard
        title="Skeleton Animation"
        description="The component supports 2 animation types: pulse and wave"
        stackProps={{ direction: "column" }}>
        {/* By Default Skeleton has pulsating animation */}
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </ComponentContainerCard>
    </>
  );
};

const PulseMediaSkeleton = ({ loading }: MediaProps) => {
  const data = [
    {
      src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
      title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
      channel: "Don Diablo",
      views: "396k views",
      createdAt: "a week ago",
    },
    {
      src: "https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA",
      title: "Queen - Greatest Hits",
      channel: "Queen Official",
      views: "40M views",
      createdAt: "3 years ago",
    },
    {
      src: "https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw",
      title: "Calvin Harris, Sam Smith - Promises (Official Video)",
      channel: "Calvin Harris",
      views: "130M views",
      createdAt: "10 months ago",
    },
  ];

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
};

const PulsatingAnimationSkeleton = () => {
  return (
    <>
      <ComponentContainerCard
        title="Pulsating Animation"
        description="The pulsating animation skeleton with skeleton of YouTube videos skeleton"
        stackProps={{ gap: 0 }}>
        <PulseMediaSkeleton loading />
        <PulseMediaSkeleton />
      </ComponentContainerCard>
    </>
  );
};

const WaveMediaSkeleton = ({ loading }: MediaProps) => {
  return (
    <Card sx={{ maxWidth: 345, width: 345, m: "11px" }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <LuMoreVertical />
            </IconButton>
          )
        }
        title={loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> : "Ted"}
        subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : "5 hours ago"}
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}

      <CardContent>
        {loading ? (
          <Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            {"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const WaveAnimationSkeleton = () => {
  return (
    <>
      <ComponentContainerCard
        title="Wave Animation"
        description="The wave animation skeleton with skeleton of YouTube videos skeleton"
        stackProps={{ gap: 0, direction: "row" }}>
        <WaveMediaSkeleton loading />
        <WaveMediaSkeleton />
      </ComponentContainerCard>
    </>
  );
};

const TypographyDemo = ({ loading }: MediaProps) => {
  const variants = ["h1", "h3", "body1", "caption"] as readonly TypographyProps["variant"][];
  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
};

const InferringDimensionsSkeleton = () => {
  return (
    <>
      <ComponentContainerCard
        title="Inferring Dimensions"
        description="In addition to accepting width and height props, the component can also infer the dimensions.">
        <Grid container spacing={8}>
          <Grid item xs>
            <TypographyDemo loading />
          </Grid>
          <Grid item xs>
            <TypographyDemo />
          </Grid>
        </Grid>
      </ComponentContainerCard>
    </>
  );
};

const ColoredSkeleton = () => {
  return (
    <>
      <ComponentContainerCard
        title="Colored Skeleton"
        description="The component supports 3 colors: primary, secondary and info"
        stackProps={{ direction: "column" }}>
        <Skeleton sx={{ bgcolor: "#ff6b3d" }} />
        <Skeleton sx={{ bgcolor: "#5eb5ff" }} />
        <Skeleton sx={{ bgcolor: "#26c362" }} />
        <Skeleton sx={{ bgcolor: "#ff0a0a" }} />
        <Skeleton sx={{ bgcolor: "#fdb906" }} />
        <Skeleton sx={{ bgcolor: "#3FC6FC" }} />
        <Skeleton />
      </ComponentContainerCard>
    </>
  );
};

const Skeletons = () => {
  return (
    <>
      <PageBreadcrumb title="Skeleton" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <SkeletonVariants />
        </Grid>

        <Grid item lg={6}>
          <ColoredSkeleton />
        </Grid>

        <Grid item lg={6}>
          <SkeletonAnimation />
        </Grid>

        <Grid item lg={6}>
          <InferringDimensionsSkeleton />
        </Grid>

        <Grid item lg={6}>
          <PulsatingAnimationSkeleton />
        </Grid>

        <Grid item lg={6}>
          <WaveAnimationSkeleton />
        </Grid>
      </Grid>
    </>
  );
};

export default Skeletons;
