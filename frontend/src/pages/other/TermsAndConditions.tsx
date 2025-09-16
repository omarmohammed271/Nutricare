import { Box, Typography, Container, Paper } from "@mui/material";
import { PageMetaData } from "@src/components";

const TermsAndConditions = () => {
  return (
    <>
      <PageMetaData title="Terms and Conditions" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontWeight: 600 }}>
            Terms and Conditions
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Last updated: January 2025
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing and using NutriCare services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              2. Use License
            </Typography>
            <Typography variant="body1" paragraph>
              Permission is granted to temporarily download one copy of the materials on NutriCare's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                modify or copy the materials
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                use the materials for any commercial purpose or for any public display
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                attempt to reverse engineer any software contained on the website
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              3. Medical Disclaimer
            </Typography>
            <Typography variant="body1" paragraph>
              The information on this website is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              4. Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              5. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              In no event shall NutriCare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NutriCare's website, even if NutriCare or a NutriCare authorized representative has been notified orally or in writing of the possibility of such damage.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              6. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about these Terms and Conditions, please contact us at:
            </Typography>
            <Typography variant="body1" paragraph>
              Email: legal@nutricare.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Health Street, Wellness City, WC 12345
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default TermsAndConditions;
