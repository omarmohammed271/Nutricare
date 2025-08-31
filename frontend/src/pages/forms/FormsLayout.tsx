import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, IconButton, InputAdornment, MenuItem, Typography } from "@mui/material";
import * as yup from "yup";
import {
  CheckboxInput,
  ComponentContainerCard,
  FormInput,
  PageBreadcrumb,
  PasswordInput,
  SelectInput,
} from "@src/components";
import { useForm } from "react-hook-form";
import { LuAtSign } from "react-icons/lu";

const BasicForm = () => {
  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <Grid item xs={12} lg={6}>
      <ComponentContainerCard title="Basic Example">
        <Box pt={"20px"} width={"100%"}>
          <form onSubmit={handleSubmit(() => null)}>
            <FormInput
              name="email"
              label="Email Address"
              containerSx={{ mb: "12px" }}
              type="email"
              placeholder="Enter email"
              control={control}
            />
            <PasswordInput
              name="password"
              label="Password"
              containerSx={{ mb: "12px" }}
              placeholder="Enter password"
              control={control}
            />
            <CheckboxInput name="rememberMe" label="Check me out !" control={control} />
            <Box mt={"10px"}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </ComponentContainerCard>
    </Grid>
  );
};
const HorizontalForm = () => {
  const loginFormSchema = yup.object({
    email2: yup.string().email("Please enter valid email").required("Please enter email"),
    password2: yup.string().required("Please enter password"),
    retypepassword2: yup
      .string()
      .oneOf([yup.ref("password2")], "Passwords must match")
      .required("Enter Re Password"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <Grid item xs={12} lg={6}>
      <ComponentContainerCard title="Horizontal form">
        <Box pt={"20px"} width={"100%"}>
          <form onSubmit={handleSubmit(() => null)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  alignItems: "center",
                  gap: "24px",
                }}>
                <Typography sx={{ mb: "8px" }}>Email</Typography>
                <Box gridColumn={"span 3 / span 3"}>
                  <FormInput name="email2" type="email" placeholder="Email" control={control} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  alignItems: "center",
                  gap: "24px",
                }}>
                <Typography sx={{ mb: "8px" }}>password</Typography>
                <Box gridColumn={"span 3 / span 3"} width={"100%"}>
                  <PasswordInput name="password2" placeholder="Password" control={control} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  alignItems: "center",
                  gap: "24px",
                }}>
                <Typography sx={{ mb: "8px" }}>Re Password</Typography>
                <Box gridColumn={"span 3 / span 3"}>
                  <PasswordInput name="retypepassword2" placeholder="Password" control={control} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  alignItems: "center",
                  gap: "24px",
                }}>
                <Box sx={{ gridColumnStart: 2, gridColumnEnd: 4, width: "100%" }}>
                  <CheckboxInput name="rememberMe" label="Check me out !" control={control} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  alignItems: "center",
                  gap: "24px",
                }}>
                <Box sx={{ gridColumnStart: { md: 2 }, gridColumn: "span 2 / span 2" }}>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </ComponentContainerCard>
    </Grid>
  );
};

const SizingForm = () => {
  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    name: yup.string().required("Please enter Name"),
    username: yup.string().required("Please enter username"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  return (
    <Grid item xs={12}>
      <ComponentContainerCard
        title="Basic Example"
        description="As shown in the previous examples, our grid system allows you to place any number of a .grid-cols-* and .flex">
        <Box pt={"20px"} width={"100%"}>
          <form onSubmit={handleSubmit(() => null)}>
            <Grid container spacing={3} mb={"24px"} alignItems={"baseline"}>
              <Grid item xs={12} md={4}>
                <FormInput name="email" placeholder="email@example.com" control={control} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PasswordInput name="password" placeholder="Password" control={control} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Confirm identity
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          <form onSubmit={handleSubmit(() => null)}>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "16px" }}>
              <FormInput name="name" placeholder="Jane Doe" control={control} />
              <FormInput
                name="username"
                placeholder="Username"
                control={control}
                startAdornment={
                  <InputAdornment position="start">
                    <LuAtSign />
                  </InputAdornment>
                }
              />
              <Box>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </ComponentContainerCard>
    </Grid>
  );
};

const GridForm = () => {
  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    address: yup.string().required("Please enter address"),
    address2: yup.string().required("Please enter address2"),
    city: yup.string().required("Please select city"),
    state: yup.string().required("Please select state"),
    zip: yup.string().required("Please enter zip"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  return (
    <Grid item xs={12}>
      <ComponentContainerCard title="Grid" description="More complex layouts can also be created with the grid system.">
        <form onSubmit={handleSubmit(() => null)} style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormInput name="email" label="Email" type="email" placeholder="Email" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PasswordInput name="password" label="Password" placeholder="Password" control={control} />
            </Grid>
            <Grid item xs={12}>
              <FormInput name="address" label="Address" placeholder="1234 main st" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput name="address2" label="Address2" placeholder="Apartment, studio, or floor" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectInput name="city" label="City" type="select" control={control}>
                <MenuItem>Choose</MenuItem>
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
                <MenuItem value="Option 4">Option 4</MenuItem>
              </SelectInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectInput name="state" label="State" type="select" control={control}>
                <MenuItem>Choose</MenuItem>
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
                <MenuItem value="Option 4">Option 4</MenuItem>
              </SelectInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput name="zip" label="Zip" type="text" control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CheckboxInput name="rememberMe" label="Check this Custom checkbox" control={control} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </ComponentContainerCard>
    </Grid>
  );
};

const FormsLayout = () => {
  const { control } = useForm();
  return (
    <>
      <PageBreadcrumb title="Layout" subName="Form" />
      <Grid container spacing={3}>
        <BasicForm />
        <HorizontalForm />
        <SizingForm />
        <GridForm />
      </Grid>
    </>
  );
};

export default FormsLayout;
