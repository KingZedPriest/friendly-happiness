import { useCompetitorFormStore } from './../stores/useCompetitorForm';

export function checkCompetitorFormGroup(groupNumber: number): boolean {
    const data = useCompetitorFormStore.getState().data;

    switch (groupNumber) {
        case 1:
            return !!(data.fullName || data.emailAddress || data.phoneNumber);
        case 2:
            return !!data.danceVideo;
        case 3:
            return !!data.story;
        default:
            return false;
    }
}

export function checkAllField(): boolean {
    const data = useCompetitorFormStore.getState().data;
    const result: boolean = !!(data.fullName || data.emailAddress || data.phoneNumber || data.danceVideo || data.story)
    return result
}