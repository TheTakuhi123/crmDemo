import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip, Chip, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { RaynetClient } from "../../../models/RaynetClient";
import { getChipColor, getStateColor } from "../../../hooks/utils/useUtils";

export const useClientsContainer = () => {
  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState<number | string | null>(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const handleClose = () => {
    setIsCollapseOpen(false);
    setSelectedRowId(null);
  };

  const handleOpenCollapse = (id: number | string) => {
    if (selectedRowId === id && isCollapseOpen) {
      handleClose();
    } else {
      setSelectedRowId(id);
      setIsCollapseOpen(true);
    }
  };

  const columns = useMemo<GridColDef<RaynetClient>[]>(() => [
    {
      field: "viewDetail",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => handleOpenCollapse(params.row.id)}
          color={selectedRowId === params.row.id ? "primary" : "default"}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
    { field: "name", headerName: "Název", minWidth: 200, flex: 2, },
    {
      field: "state",
      headerName: "Stav",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const colorKey = getStateColor(params.row.state);
        return (
          <Box
            component="span"
            sx={{
              color: colorKey === 'default' ? 'text.secondary' : `${colorKey}.main`,
            }}
          >
            {params.row.state}
          </Box>
        );
      }
    },
    { field: "role", headerName: "Vztah", minWidth: 130, flex: 1, },
    { field: "rating", headerName: "Rating", width: 80, align: "center" },
    {
      field: "owner",
      headerName: "Vlastník",
      minWidth: 100,
      flex: 1,
      valueGetter: (value: any) => value?.fullName || "",
    },
    { field: "regNumber", headerName: "IČ", minWidth: 100, flex: 1, },
    {
      field: "city",
      headerName: "Město",
      minWidth: 130,
      flex: 1,
      valueGetter: (_value, row) => row.primaryAddress?.address?.city || "",
    },
    {
      field: "category",
      headerName: "Kategorie",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        const categoryValue = params.row.category?.value;
        if (!categoryValue) return null;

        return (
          <Chip
            label={categoryValue}
            size="small"
            color={getChipColor(categoryValue)}
            variant="filled"
            sx={{
              fontSize: '0.7rem',
              color: '#fff',
              textTransform: 'capitalize',
              borderRadius: '1rem',
            }}
          />
        );
      }
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 50,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Přejít na detail stránku">
          <IconButton
            size="small"
            onClick={() => navigate(`/clients/${params.row.id}`)}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ], [selectedRowId, isCollapseOpen, navigate]);

  return {
    columns,
    selectedRowId,
    isCollapseOpen,
    handleClose,
    handleOpenCollapse,
  };
};