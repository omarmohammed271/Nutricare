import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useToggle } from "@src/hooks";
import { LuEye, LuEyeOff, LuUserCircle2 } from "react-icons/lu";

const FieldInputsContainer = styled("div")(({ theme }) => {
  return {
    display: "grid",
    [theme.breakpoints.up("xs")]: {
      gridTemplateColumns: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "auto auto",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "auto auto auto",
    },
    gap: 12,
    width: "100%",
  };
});

const FullWidthInputsContainer = styled("div")(() => {
  return {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  };
});

const BasicTextField = () => {
  return (
    <ComponentContainerCard
      title="Basic TextField"
      description="The TextField wrapper component is a complete form control including a label, input, and help text.">
      <FieldInputsContainer>
        <TextField label="Outlined" variant="outlined" />
        <TextField label="Filled" variant="filled" />
        <TextField label="Standard" variant="standard" />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const FormPropsTextField = () => {
  return (
    <ComponentContainerCard
      title="Form Props"
      description="Standard form attributes are supported e.g. required, disabled, type, etc."
      stackProps={{ direction: "column" }}>
      <FieldInputsContainer>
        <TextField required id="outlined-required" label="Required" defaultValue="Hello World" />
        <TextField disabled id="outlined-disabled" label="Disabled" defaultValue="Hello World" />
        <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField required id="filled-required" label="Required" defaultValue="Hello World" variant="filled" />
        <TextField disabled id="filled-disabled" label="Disabled" defaultValue="Hello World" variant="filled" />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField id="filled-search" label="Search field" type="search" variant="filled" />
        <TextField
          id="filled-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField required id="standard-required" label="Required" defaultValue="Hello World" variant="standard" />
        <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" variant="standard" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField id="standard-search" label="Search field" type="search" variant="standard" />
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const ValidationTextField = () => {
  return (
    <ComponentContainerCard title="Validation" description="The error prop toggles the error state.">
      <FieldInputsContainer>
        <TextField error id="outlined-error" label="Error" defaultValue="Hello World" />
        <TextField error id="filled-error" label="Error" defaultValue="Hello World" variant="filled" />
        <TextField error id="standard-error" label="Error" defaultValue="Hello World" variant="standard" />
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField
          error
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
        <TextField
          error
          id="filled-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="filled"
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="standard"
        />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const MultilineTextField = () => {
  return (
    <ComponentContainerCard
      title="Multiline"
      description="The multiline prop transforms the text field into a TextareaAutosize element. ">
      <FieldInputsContainer>
        <TextField id="outlined-multiline-flexible" label="Multiline" multiline maxRows={4} />
        <TextField id="filled-multiline-flexible" label="Multiline" multiline maxRows={4} variant="filled" />
        <TextField id="standard-multiline-flexible" label="Multiline" multiline maxRows={4} variant="standard" />
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
        />
        <TextField id="outlined-textarea" label="Multiline Placeholder" placeholder="Placeholder" multiline />
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField id="outlined-multiline-static" label="Multiline" multiline rows={4} defaultValue="Default Value" />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
        />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const SelectTextInput = () => {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <ComponentContainerCard
      title="Select"
      description="The select prop makes the text field use the Select component internally.">
      <FieldInputsContainer>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="filled">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="standard">
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FieldInputsContainer>
      <FieldInputsContainer>
        <TextField
          id="filled-select-currency-native"
          select
          label="Native select"
          defaultValue="EUR"
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
          variant="filled">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          defaultValue="EUR"
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          defaultValue="EUR"
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
          variant="standard">
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const TextInputWithIcon = () => {
  return (
    <ComponentContainerCard title="Icons" description="There are multiple ways to display an icon with a text field.">
      <FieldInputsContainer>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <LuUserCircle2 size={20} />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuUserCircle2 size={20} />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LuUserCircle2 style={{ marginRight: 5, marginTop: 0.5, marginBottom: 0.5 }} size={20} color="#757575" />
          <TextField id="input-with-sx" label="With sx" variant="standard" />
        </Box>
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const AdornmentTextInput = () => {
  const { isOpen, toggleOpen } = useToggle();

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ComponentContainerCard
      title="Adornment"
      description="This can be used to add a prefix, a suffix, or an action to an input.">
      <FullWidthInputsContainer>
        <Box sx={{ display: { sm: "flex" } }}>
          <TextField
            label="With normal TextField"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={isOpen ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleOpen}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {isOpen ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </FullWidthInputsContainer>

      <FullWidthInputsContainer>
        <Box sx={{ display: { sm: "flex" } }}>
          <TextField
            label="With normal TextField"
            id="filled-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
            variant="filled"
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <FilledInput
              id="filled-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="filled-weight-helper-text">Weight</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={isOpen ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleOpen}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {isOpen ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </FullWidthInputsContainer>

      <FullWidthInputsContainer>
        <Box sx={{ display: { sm: "flex" } }}>
          <TextField
            label="With normal TextField"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={isOpen ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleOpen}
                    onMouseDown={handleMouseDownPassword}>
                    {isOpen ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input id="standard-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
      </FullWidthInputsContainer>
    </ComponentContainerCard>
  );
};

const SizesTextInput = () => {
  return (
    <ComponentContainerCard title="Sizes" description="Fancy smaller inputs? Use the size prop.">
      <FieldInputsContainer>
        <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small" />
        <TextField label="Size" id="filled-size-small" defaultValue="Small" variant="filled" size="small" />
        <TextField label="Size" id="standard-size-small" defaultValue="Small" size="small" variant="standard" />
      </FieldInputsContainer>

      <FieldInputsContainer>
        <TextField label="Size" id="outlined-size-normal" defaultValue="Normal" />
        <TextField label="Size" id="filled-size-normal" defaultValue="Normal" variant="filled" />
        <TextField label="Size" id="standard-size-normal" defaultValue="Normal" variant="standard" />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const MarginTextInput = () => {
  const RedBar = () => {
    return (
      <Box
        sx={{
          height: 20,
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "rgba(255, 0, 0, 0.1)" : "rgb(255 132 132 / 25%)",
        }}
      />
    );
  };

  return (
    <ComponentContainerCard
      title="Margin"
      description="The margin prop can be used to alter the vertical spacing of the text field."
      stackProps={{ justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "25ch" },
        }}>
        <RedBar />
        <TextField label={'margin="none"'} id="margin-none" />
        <RedBar />
        <TextField label={'margin="dense"'} id="margin-dense" margin="dense" />
        <RedBar />
        <TextField label={'margin="normal"'} id="margin-normal" margin="normal" />
        <RedBar />
      </Box>
    </ComponentContainerCard>
  );
};

const FullWidthTextInput = () => {
  return (
    <ComponentContainerCard
      title="Full Width"
      description="The fullWidth prop can be used to make the text field full width.">
      <TextField label="Full Width" id="full-width" defaultValue="Full Width" fullWidth />
    </ComponentContainerCard>
  );
};

const ColoredTextInput = () => {
  return (
    <ComponentContainerCard title="Colored" description="The color prop can be used to use colored TextField">
      <FieldInputsContainer>
        <TextField label="Outlined Primary" color="primary" focused />
        <TextField label="Outlined Secondary" color="secondary" focused />
        <TextField label="Filled Success" variant="filled" color="success" focused />
        <TextField label="Filled Error" variant="filled" color="error" focused />
        <TextField label="Standard warning" variant="standard" color="warning" focused />
        <TextField label="Standard Info" variant="standard" color="info" focused />
      </FieldInputsContainer>
    </ComponentContainerCard>
  );
};

const BasicElements = () => {
  return (
    <>
      <PageBreadcrumb title="Basic Elements" subName="Forms" />

      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} lg={6}>
          <Grid item xs={12}>
            <BasicTextField />
          </Grid>

          <Grid item xs={12}>
            <TextInputWithIcon />
          </Grid>

          <Grid item xs={12}>
            <FullWidthTextInput />
          </Grid>

          <Grid item xs={12}>
            <ValidationTextField />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <FormPropsTextField />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AdornmentTextInput />
        </Grid>

        <Grid item container spacing={3} xs={12} lg={6}>
          <Grid item xs={12}>
            <SelectTextInput />
          </Grid>

          <Grid item xs={12}>
            <ColoredTextInput />
          </Grid>
        </Grid>

        <Grid item container lg={6} spacing={3}>
          <Grid item xs={12}>
            <MarginTextInput />
          </Grid>

          <Grid item xs={12}>
            <SizesTextInput />
          </Grid>
        </Grid>

        <Grid item lg={6}>
          <MultilineTextField />
        </Grid>
      </Grid>
    </>
  );
};

export default BasicElements;
