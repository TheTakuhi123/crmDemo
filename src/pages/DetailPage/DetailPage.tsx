import { FC } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert, Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DetailContainer from "../../containers/DetailContainer";
import { useGetClientDetail } from "../../hooks/queries/useGetDetailClient";
import RaynetLogo from "../../components/RaynetLogo";

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetClientDetail(id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.success) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Nepodařilo se načíst detail klienta. Zkontrolujte připojení nebo platnost ID.
        </Alert>
      </Box>
    );
  }

  const client = data.data;

  return (
    <Box sx={{ padding: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h2" sx={{ m: 0, textAlign: { xs: 'center', md: 'left' }, mt: { xs: 1, md: 0 } }}>
          Detail klienta: {client.name}
        </Typography>
        <Stack direction="row" sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}                   >
            <RaynetLogo />
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: '1rem',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: 'none',
              width: { xs: '100%', md: 'auto' },
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,163,173,0.3)',
              }
            }}
          >
            Zpět na seznam
          </Button>
        </Stack>

      </Stack>
      <DetailContainer
        data={{
          category: client.category?.value || "",
          state: client.state,
          role: client.role,
          name: client.name,
          imageUrl: "https://picsum.photos/200",
          regNumber: client.regNumber,
          address: {
            street: client.primaryAddress.address.street,
            city: client.primaryAddress.address.city,
            zip: client.primaryAddress.address.zipCode,
            country: client.primaryAddress.address.country
          },
          websiteUrl: client.primaryAddress.contactInfo.www || "",
          text: client.regNumber,
          owner: client.owner.fullName,
        }}
      />
    </Box>
  );
};

export default DetailPage;
