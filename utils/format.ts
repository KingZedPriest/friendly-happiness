export const formatSubheading = (page: string) => {
    switch (page) {
        case "dashboard":
            return "Unified Dashboard for Seamless Operations.";
        case "competition":
            return "Contestants Oversight and Management.";
        case "contestants":
            return "Unified Page for Quick Contestants Management.";
        case "profile":
            return "Personalized Account Management for Tailored Service.";
        case "staff":
            return "Comprehensive Staff Oversight for Optimal Performance.";
        case "staff/new":
            return "Add New Staff Member to Enhance Efficiency.";
        case "competition/new":
            return "Create a New Competition.";
        case "unauthorised":
            return "Insufficient Clearance.";
        default:
            return "Seamless Competition Operations and Management.";
    }
};