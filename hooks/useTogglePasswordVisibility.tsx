import { useState } from "react";

/**
  * A custom hook to toggle the visibility of the password input field.
  * @returns {{
  *   passwordVisibility: boolean,
  *   rightIcon: string,
  *   handlePasswordVisibility: () => void
  *   }} An object containing the password visibility state, right icon name, and a function to toggle the visibility.
  */
export function useTogglePasswordVisibility(): {
  passwordVisibility: boolean;
  rightIcon: string;
  handlePasswordVisibility: () => void;
} {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');

  /**
   * Toggles the visibility of the password input field.
   * Updates the visibility state and the right icon displayed.
   */
  const handlePasswordVisibility = () => {

    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};

/**
  * A custom hook to toggle the visibility of the password confirmation input field.
  * @returns {{
  *   confirmationVisibility: boolean,
  *   confirmationRightIcon: string,
  *   handleConfirmationVisibility: () => void
  *   }} An object containing the password confirmation visibility state, right icon name, and a function to toggle the visibility.
  */
export function useToggleConfirmationVisibility(): {
  confirmationVisibility: boolean;
  confirmationRightIcon: string;
  handleConfirmationVisibility: () => void;
} {
  const [confirmationVisibility, setConfirmationVisibility] = useState(true);
  const [confirmationRightIcon, setRightIcon] = useState('eye-off');

  /**
   * Toggles the visibility of the password input field.
   * Updates the visibility state and the right icon displayed.
   */
  const handleConfirmationVisibility = () => {

    if (confirmationRightIcon === 'eye') {
      setRightIcon('eye-off');
      setConfirmationVisibility(!confirmationVisibility);
    } else if (confirmationRightIcon === 'eye-off') {
      setRightIcon('eye');
      setConfirmationVisibility(!confirmationVisibility);
    }
  };
  return {
    confirmationVisibility,
    confirmationRightIcon,
    handleConfirmationVisibility
  };
};