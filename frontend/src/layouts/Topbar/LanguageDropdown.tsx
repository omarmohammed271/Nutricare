/*
 * Copyright (c) 2023.
 * File Name: LanguageDropdown.tsx
 * Author: Coderthemes
 */

import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { LuChevronDown } from "react-icons/lu";
import { useDropdownMenu } from "@src/hooks";

const LanguageDropdown = () => {
  const { i18n, t } = useTranslation();
  const { anchorEl, open, handleClick, handleClose } = useDropdownMenu();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
    
    // Update document direction for RTL languages
    if (languageCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  };

  return (
    <Box sx={{ cursor: "pointer", gap: 1, alignItems: "center", display: "flex", height: "100%", width: "auto" }}>
      <Button
        sx={{ color: "text.secondary" }}
        onClick={handleClick}
        variant="text"
        startIcon={<Box sx={{ fontSize: '18px' }}>{currentLanguage.flag}</Box>}
        endIcon={<LuChevronDown />}>
        {currentLanguage.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {languages.map((language) => (
          <MenuItem 
            key={language.code} 
            onClick={() => handleLanguageChange(language.code)}
            selected={i18n.language === language.code}
          >
            <ListItemAvatar sx={{ minWidth: "25px" }}>
              <Box sx={{ fontSize: '18px' }}>{language.flag}</Box>
            </ListItemAvatar>
            <ListItemText>{language.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageDropdown;
