import { Box, Grid, IconContainerProps, Rating, Typography } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { ReactElement, useState } from "react";
import { LuAnnoyed, LuFrown, LuHeart, LuLaugh, LuMeh, LuSmile, LuStar } from "react-icons/lu";

const BasicRating = () => {
  const [value, setValue] = useState<number | null>(2);

  return (
    <ComponentContainerCard
      title="Basic"
      description="Basic example of Rating component"
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </ComponentContainerCard>
  );
};

const PrecisionRating = () => {
  return (
    <ComponentContainerCard
      title="Precision"
      description="The rating can display any float number with the value prop."
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </ComponentContainerCard>
  );
};

const FeedbackOnHoverRatign = () => {
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <ComponentContainerCard
      title="Feedback on hover"
      description="You can display a label on hover to help the user pick the correct rating value."
      stackProps={{ alignItems: "center", direction: "column" }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<LuStar style={{ opacity: 0.55 }} />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </ComponentContainerCard>
  );
};

const RatingSizes = () => {
  return (
    <ComponentContainerCard
      title="Sizes"
      description="For larger or smaller ratings use the size prop."
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Rating name="size-small" defaultValue={2} size="small" />
      <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" />
    </ComponentContainerCard>
  );
};

const CustomizedRating = () => {
  return (
    <ComponentContainerCard
      title="Customized"
      description="Here are some examples of customizing the component."
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Typography component="legend">Custom icon and color</Typography>
      <Rating
        name="customized-color"
        defaultValue={2}
        getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
        icon={<LuHeart color="#ff0000" fill="#ff0000" enableBackground={"#ff0000"} />}
        emptyIcon={<LuHeart />}
        sx={{
          "& > label": {
            marginInlineEnd: "4px",
          },
        }}
      />
      <Typography component="legend">10 stars</Typography>
      <Rating name="customized-10" defaultValue={2} max={10} />
    </ComponentContainerCard>
  );
};

const RadioGroupRating = () => {
  const customIcons: {
    [index: string]: {
      icon: ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <LuFrown />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <LuAnnoyed />,
      label: "Dissatisfied",
    },
    3: {
      icon: <LuMeh />,
      label: "Neutral",
    },
    4: {
      icon: <LuSmile />,
      label: "Satisfied",
    },
    5: {
      icon: <LuLaugh />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  return (
    <ComponentContainerCard
      title="Radio group"
      description="The rating is implemented with a radio group, set highlightSelectedOnly to restore the natural behavior."
      stackProps={{ justifyContent: "center" }}>
      <Rating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        sx={{
          "& > label": {
            marginInlineEnd: "4px",
          },
        }}
        highlightSelectedOnly
      />
    </ComponentContainerCard>
  );
};

const Ratings = () => {
  return (
    <>
      <PageBreadcrumb title="Ratings" subName="Extended UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <BasicRating />
        </Grid>

        <Grid item container lg={6} spacing={3}>
          <Grid item xs={12}>
            <PrecisionRating />
          </Grid>
          <Grid item xs={12}>
            <RatingSizes />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomizedRating />
        </Grid>

        <Grid item container lg={6} spacing={3}>
          <Grid item xs={12}>
            <FeedbackOnHoverRatign />
          </Grid>
          <Grid item xs={12}>
            <RadioGroupRating />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Ratings;
