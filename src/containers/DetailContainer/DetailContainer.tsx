import { FC } from "react";

import { Stack, Chip, Paper, Typography, Box, Link, Divider, Avatar } from "@mui/material";
import { DetailDataInterface } from "../../models/DetailDataInterface";
import { getChipColor, getStateColor } from "../../hooks/utils/useUtils";

interface DetailContainerProps {
  data: DetailDataInterface;
}

const DetailContainer: FC<DetailContainerProps> = ({ data }) => {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: '0.5rem' }}>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
        {data.category && (
          <Chip
            label={data.category}
            color={getChipColor(data.category)}
            size="medium"
            sx={{ fontWeight: 'bold', borderRadius: '0.25rem', textTransform: 'uppercase', }}
          />
        )}
        <Typography variant="overline" sx={{ fontWeight: 'bold', color: `${getStateColor(data.state)}.main` }}>
          {getStateColor(data.state)} {data.role}
        </Typography>
      </Stack>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
        {data.name}
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 4 }} alignItems={'center'}>
        <Box
          component="img"
          src={data.imageUrl}
          sx={{
            width: { xs: 160, sm: 200 },
            height: { xs: 160, sm: 200 },
            objectFit: 'contain',
            borderRadius: '1rem',
          }}
        />

        <Stack spacing={1} sx={{ width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
          {data.regNumber && (
            <Typography variant="body1">
              IČ {data.regNumber}
            </Typography>
          )}

          <Box sx={{ mt: 1 }}>
            <Typography variant="body1">{data.address.street}</Typography>
            <Typography variant="body1">{data.address.zip} {data.address.city}</Typography>
            <Typography variant="body1">{data.address.country}</Typography>
          </Box>

          {data.websiteUrl && (
            <Link
              href={data.websiteUrl}
              target="_blank"
              sx={{
                mt: 1,
                textDecoration: 'underline',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Zobrazit na mapě
            </Link>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2, borderColor: '#e0e6e8' }} />
      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
        {data.text}
      </Typography>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 0.5, py: 1 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.875rem',
            bgcolor: 'primary.light',
            color: 'text.main',
            fontWeight: 'bold'
          }}
        >
          {data.owner.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
        </Avatar>

        <Box>
          <Typography variant="caption" display="block" sx={{ color: 'text.secondary', lineHeight: 2 }}>
            Vlastník
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {data.owner}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DetailContainer;
