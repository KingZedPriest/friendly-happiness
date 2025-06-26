import { create } from "zustand";

type CompetitorFormStore = {
    data: CompetitorFormData;
    updateField: <K extends keyof CompetitorFormData>(field: K, value: CompetitorFormData[K]) => void;
    resetForm: () => void;
};

export const useCompetitorFormStore = create<CompetitorFormStore>((set) => ({
    data: {
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        danceVideo: null,
        story: "",
    },
    updateField: (field, value) =>
        set((state) => ({
            data: { ...state.data, [field]: value },
        })),
    resetForm: () =>
        set(() => ({
            data: {
                fullName: "",
                emailAddress: "",
                phoneNumber: "",
                danceVideo: null,
                story: "",
            },
        })),
}));