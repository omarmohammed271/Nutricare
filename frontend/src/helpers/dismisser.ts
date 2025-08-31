/**
 *  Pass ID of Element to Dismiss
 * @param eleId
 */
const handleDismiss = (eleId: string) => {
  const element = document.getElementById(eleId);
  if (element) element.style.display = "none";
};

export default handleDismiss;
