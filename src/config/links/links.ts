import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { MainNavigationLink } from "../../models/MainNavLink";

export const appLinks: MainNavigationLink[] = [
  {
    url: "/",
    partialPath: "/",
    label: "Home",
    key: "home",
    icon: HomeIcon,
  },
  {
    url: "/:id/*",
    partialPath: "/:id",
    label: "Detail",
    key: "detail",
    icon: ListAltIcon,
  },
];
