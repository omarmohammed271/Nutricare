import { Box, Typography, Container, Paper } from "@mui/material";
import { PageMetaData } from "@src/components";

const PrivacyPolicy = () => {
  return (
    <>
      <PageMetaData title="Privacy Policy" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontWeight: 600 }}>
            Privacy Policy
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Last updated: January 2025
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Personal information (name, email address, phone number)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Health and nutrition information you choose to share
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Account credentials and preferences
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Communication records with our support team
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Provide, maintain, and improve our services
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Process transactions and send related information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Send technical notices and support messages
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Respond to your comments and questions
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Monitor and analyze trends and usage
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              3. Information Sharing
            </Typography>
            <Typography variant="body1" paragraph>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                With your explicit consent
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                To comply with legal obligations
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                To protect our rights and prevent fraud
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                With trusted service providers who assist us in operating our platform
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              4. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Encryption of data in transit and at rest
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Regular security assessments and updates
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Access controls and authentication measures
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Employee training on data protection
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              5. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Access and update your personal information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Request deletion of your account and data
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Opt out of marketing communications
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Request a copy of your data
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Withdraw consent for data processing
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              6. Cookies and Tracking
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              7. Changes to This Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              8. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us at:
            </Typography>
            <Typography variant="body1" paragraph>
              Email: privacy@nutricare.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Health Street, Wellness City, WC 12345
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
