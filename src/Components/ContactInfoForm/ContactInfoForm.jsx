import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Plus, Remove } from "../../assets/IconSet";

export default function ContactInfoForm() {
  const [emails, setEmails] = useState([""]);
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [contactId, setContactId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing contact info
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await axios.get("/contact-info");
        if (data && data.length > 0) {
          const contact = data[0];
          setEmails(contact.emails.length ? contact.emails : [""]);
          setPhoneNumbers(
            contact.phoneNumbers.length ? contact.phoneNumbers : [""],
          );
          setContactId(contact._id);
        }
      } catch (err) {
        toast.error("Failed to load contact info");
      }
    };

    fetchContact();
  }, []);

  // Emails
  const handleEmailChange = (i, val) =>
    setEmails((prev) => prev.map((e, idx) => (idx === i ? val : e)));
  const addEmail = () => setEmails((prev) => [...prev, ""]);
  const removeEmail = (i) =>
    setEmails((prev) => prev.filter((_, idx) => idx !== i));

  // Phones
  const handlePhoneChange = (i, val) =>
    setPhoneNumbers((prev) => prev.map((p, idx) => (idx === i ? val : p)));
  const addPhone = () => setPhoneNumbers((prev) => [...prev, ""]);
  const removePhone = (i) =>
    setPhoneNumbers((prev) => prev.filter((_, idx) => idx !== i));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = contactId
        ? `/update-contact-info/${contactId}`
        : "/create-contact-info";

      const method = contactId ? "put" : "post";

      const { data } = await axios({
        url,
        method,
        data: { emails, phoneNumbers },
      });

      setContactId(data._id);

      toast.success(
        contactId
          ? "Contact updated successfully"
          : "Contact created successfully",
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        px: 2,
      }}
    >
      <Box
        sx={{
          mt: 4,
          width: "100%",
          maxWidth: "420px",
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Emails */}
            <Box>
              <Typography variant="subtitle2" mb={1}>
                Emails
              </Typography>

              <Stack spacing={1}>
                {emails.map((email, i) => (
                  <Stack key={i} direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(i, e.target.value)}
                      placeholder="Enter email"
                    />

                    {emails.length > 1 && (
                      <IconButton color="error" onClick={() => removeEmail(i)}>
                        <Remove color="red" size="20px" />
                      </IconButton>
                    )}
                  </Stack>
                ))}
              </Stack>

              <Button
                startIcon={<Plus color="#792df8" size="20px" />}
                onClick={addEmail}
                size="small"
                sx={{ mt: 1 }}
              >
                Add More
              </Button>
            </Box>

            <Divider />

            {/* Phones */}
            <Box>
              <Typography variant="subtitle2" mb={1}>
                Phone Numbers
              </Typography>

              <Stack spacing={1}>
                {phoneNumbers.map((phone, i) => (
                  <Stack key={i} direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      value={phone}
                      onChange={(e) => handlePhoneChange(i, e.target.value)}
                      placeholder="Enter phone number"
                    />

                    {phoneNumbers.length > 1 && (
                      <IconButton color="error" onClick={() => removePhone(i)}>
                        <Remove color="red" size="20px" />
                      </IconButton>
                    )}
                  </Stack>
                ))}
              </Stack>

              <Button
                startIcon={<Plus size="20px" color="#792df8" />}
                onClick={addPhone}
                size="small"
                sx={{ mt: 1 }}
              >
                Add More
              </Button>
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : contactId
                  ? "Update Contact"
                  : "Create Contact"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
