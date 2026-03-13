import { SvgIconComponent } from "@mui/icons-material";

export interface MainNavigationLink {
  url: string;
  partialPath: string;
  label: string;
  key: string;
  icon: SvgIconComponent;
}
