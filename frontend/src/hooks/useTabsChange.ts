import { SyntheticEvent, useState } from "react";

const useTabsChange = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange };
};

export default useTabsChange;
