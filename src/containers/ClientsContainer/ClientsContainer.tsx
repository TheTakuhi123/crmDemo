import { FC } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Box, CircularProgress, Alert, Paper, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

import DetailContainer from "../DetailContainer";
import CollapseDetail from "../../components/CollapsibleDetail";
import SearchBox from "../../components/SearchBox";
import { useClientsContainer } from "./module/useClientsContainer";
import { useGetClients } from "../../hooks/queries/useGetClients";
import RaynetLogo from "../../components/RaynetLogo";


const ClientsContainer: FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const fulltextQuery = searchParams.get("fulltext") || "";

    const { columns, selectedRowId, isCollapseOpen, handleClose } = useClientsContainer();
    const { data, isLoading, isFetching, error } = useGetClients({ fulltext: fulltextQuery });
    const rows = data?.data ?? [];
    const selectedData = rows.find((r) => r.id === selectedRowId);

    const handleSearchChange = (val: string) => {
        if (val) {
            setSearchParams({ fulltext: val }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    if (isLoading && !isFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    Nepodařilo se načíst data
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 0, backgroundColor: 'background.default', minHeight: '100vh' }}>
            <Stack direction="row" sx={{ mb: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', pr: 4 }}>
                <Stack direction="row" sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Klienti
                    </Typography>
                    <SearchBox defaultValue={fulltextQuery} onSearch={handleSearchChange} />
                </Stack>
                <RaynetLogo />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: '100%', height: '80vh' }}>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            loading={isFetching}
                            showToolbar
                            density="compact"
                            disableRowSelectionOnClick
                            sx={{
                                border: 'none',
                                backgroundColor: '#fff',
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: '#F4F7F8',
                                    borderBottom: '4vh solid #F4F7F8',
                                    minHeight: '40px !important',
                                    maxHeight: '40px !important',
                                    lineHeight: '40px !important',
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    color: '#6c757d',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                },
                                '& .MuiDataGrid-row': {
                                    borderBottom: '1px solid #f0f2f4',
                                    '&:hover': {
                                        backgroundColor: '#f8fbfc',
                                    },
                                },
                                '& .MuiDataGrid-cell': {
                                    fontSize: '0.85rem',
                                    color: '#333',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#fff',
                                    borderTop: '2vh solid #F4F7F8',
                                    minHeight: '45px',
                                    justifyContent: 'flex-start',
                                },
                            }}
                        />
                    </Paper>
                </Box>
                <CollapseDetail
                    isOpen={isCollapseOpen}
                    onClose={handleClose}
                    onDetail={() => navigate(`/clients/${selectedRowId}`)}
                    disabledUpButton={false}
                    disabledDownButton={false}
                >
                    {selectedData && (
                        <DetailContainer
                            data={{
                                category: selectedData.category?.value || "",
                                state: selectedData.state,
                                role: selectedData.role,
                                name: selectedData.name,
                                imageUrl: "https://picsum.photos/200",
                                regNumber: selectedData.regNumber,
                                address: {
                                    street: selectedData.primaryAddress.address.street,
                                    city: selectedData.primaryAddress.address.city,
                                    zip: selectedData.primaryAddress.address.zipCode,
                                    country: selectedData.primaryAddress.address.country
                                },
                                websiteUrl: selectedData.primaryAddress.contactInfo.www || "",
                                text: selectedData.regNumber,
                                owner: selectedData.owner.fullName,
                            }}
                        />
                    )}
                </CollapseDetail>
            </Stack>
        </Box>
    );
};

export default ClientsContainer;
