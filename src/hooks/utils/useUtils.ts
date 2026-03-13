export const getChipColor = (val: string): "success" | "warning" | "error" | "default" | "primary" | "info" => {
    switch (val) {
        case "[zelená]": return "info";
        case "VIP": return "warning";
        case "Lead": return "primary";
        case "Zákazník": return "success";
        case "Bývalý": return "error";
        default: return "default";
    }
};

export const getStateColor = (val: string): "success" | "warning" | "default" => {
    switch (val) {
        case "A_POTENTIAL": return "warning";
        case "B_ACTUAL": return "success";
        default: return "default";
    }
}